import { Module } from 'vuex'
import { ElMessage } from 'element-plus'
import { IListDataState, listKeys } from './types'
import { IRootState } from '@/store/types'
import {
  createPageDataAction,
  deletePageData,
  editPageDataAction,
  getPageListData
} from '@/service/main/list-data/list-data'

function resultMessage(result: any) {
  if (result.code !== 0) {
    ElMessage({
      message: result.data ?? '出错了~',
      type: 'error',
      duration: 3000
    })
    return
  }
  ElMessage({
    message: result.data,
    type: 'success',
    duration: 3000
  })
}

const listDataModel: Module<IListDataState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageCountData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changePagListData(state, payload) {
      ;(state as any)[`${payload.pageName}List`] = payload.list
    },
    changePagCountData(state, payload) {
      ;(state as any)[`${payload.pageName}Count`] = payload.totalCount
    }
  },
  actions: {
    async [listKeys.GET_PAGE_LIST_ACTION]({ commit }, payload) {
      try {
        const pageName: string = payload.pageName
        const pageUrl = `/${pageName}/list`

        const pageResult = await getPageListData(pageUrl, payload.queryInfo)
        const { list, totalCount } = pageResult.data

        commit('changePagListData', {
          pageName,
          list
        })
        commit('changePagCountData', {
          pageName,
          totalCount
        })
      } catch (error) {
        console.log('error: ', error)
        ElMessage({
          message: '接口出错~',
          type: 'error',
          duration: 3000
        })
      }
    },
    async [listKeys.DELETE_PAGE_DATA_ACTION]({ dispatch }, payload) {
      const { pageName, id } = payload
      const url = `/${pageName}/${id}`
      const result = await deletePageData(url)
      resultMessage(result)
      // 重新请求数据
      dispatch(listKeys.GET_PAGE_LIST_ACTION, { pageName, offset: 0, size: 10 })
    },
    async [listKeys.CREATE_PAGE_DATA_ACTION]({ dispatch }, payload) {
      const { pageName, newInfo } = payload
      const url = `/${pageName}`
      await createPageDataAction(url, newInfo)
      dispatch(listKeys.GET_PAGE_LIST_ACTION, { pageName, offset: 0, size: 10 })
    },
    async [listKeys.EDIT_PAGE_DATA_ACTION]({ dispatch }, payload) {
      const { pageName, editData, id } = payload
      const url = `/${pageName}/${id}`
      const result = await editPageDataAction(url, editData)
      resultMessage(result)
      // 重新请求数据
      dispatch(listKeys.GET_PAGE_LIST_ACTION, { pageName, offset: 0, size: 10 })
    }
  }
}

export default listDataModel
