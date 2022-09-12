import { createStore, Store, useStore as useVuexStore } from 'vuex'
import loginModule from './login/login'
import listDataModule from './main/list-data/list-data'
import dashboardModule from './main/analysis/dashboard'

import { getPageListData } from '@/service/main/list-data/list-data'

// store的类型接口
import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
  state() {
    return {
      entireDeparment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDeparment(state, list) {
      state.entireDeparment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 请求部门数据
      const departmentRes = await getPageListData('/department/list', { offset: 0, size: 1000 })
      const { list: departmentList } = departmentRes.data
      commit('changeEntireDeparment', departmentList)
      // 请求角色数据
      const roleRes = await getPageListData('/role/list', { offset: 0, size: 1000 })
      const { list: roleList } = roleRes.data
      commit('changeEntireRole', roleList)
      // 请求角色权限数据menu
      const menuRes = await getPageListData('/menu/list', { offset: 0, size: 1000 })
      const { list: menuList } = menuRes.data
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login: loginModule,
    listData: listDataModule,
    dashboard: dashboardModule
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
