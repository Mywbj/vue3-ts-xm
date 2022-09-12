import { Module } from 'vuex'
import { IRootState } from '../types'
import { ILoginState } from './types'

import localCache from '@/utils/cache'

import { accountLoginRequest, requestUserInfoById, requestUserMenusByRoleId } from '@/service/login/login'
import router from '@/router'
import { mapMenusToPermissions, mapMenusToRouter } from '@/utils/map-menus'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus) {
      state.userMenus = userMenus
      // menus to router
      const routes = mapMenusToRouter(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: any) {
      try {
        // 实现登录逻辑
        const tempData: any = { name: payload.username, password: payload.password }
        // 请求token
        const loginResult = await accountLoginRequest(tempData)
        if (loginResult.message) {
          ElMessage({
            message: '账号或密码错误~',
            type: 'warning'
          })
          return
        }
        const { id, token } = loginResult.data
        commit('changeToken', token)
        // 缓存token
        localCache.setCache('token', token)
        // 请求部门和角色数据 在根上面请求
        dispatch('getInitialDataAction', null, { root: true })
        // 请求用户信息
        const userInfoResult = await requestUserInfoById(id)
        const userInfo = userInfoResult.data
        commit('changeUserInfo', userInfo)
        // 缓存信息
        localCache.setCache('userInfo', userInfo)
        // 请求菜单
        const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
        const userMenus = userMenusResult.data
        commit('changeUserMenus', userMenus)
        // 缓存菜单
        localCache.setCache('userMenus', userMenus)
        // 跳转到首页
        router.push('/main')
      } catch (error: any) {
        console.log('error: ', error)
      }
    },
    // load缓存中的数据
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}
export default loginModule
