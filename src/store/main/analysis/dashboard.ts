import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IDashboardState } from './types'
import { getCategoryGoodsCount, getCategoryGoodsSale, getCategoryGoodsFavor, getAddressGoodsSale } from '@/service/main/analysis/dashboard'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategorySale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressSale(state, list) {
      state.addressGoodsSale = list
    },
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountRes = await getCategoryGoodsCount()
      commit('changeCategoryCount', categoryCountRes.data)
      const categorySaleRes = await getCategoryGoodsSale()
      commit('changeCategorySale', categorySaleRes.data)
      const categoryFavorRes = await getCategoryGoodsFavor()
      commit('changeCategoryFavor', categoryFavorRes.data)
      const addressSaleRes = await getAddressGoodsSale()
      commit('changeAddressSale', addressSaleRes.data)
    }
  }
}

export default dashboardModule
