import bjRequist from '@/service'
import { IDataType } from '@/service/types'

enum API {
  categoryGoodsCount = 'goods/category/count',
  categoryGoodsSale = 'goods/category/sale',
  categoryGoodsFavor = 'goods/category/favor',
  addressGoodsSale = 'goods/address/sale'
}

export function getCategoryGoodsCount() {
  return bjRequist.get<IDataType>(API.categoryGoodsCount)
}

export function getCategoryGoodsSale() {
  return bjRequist.get<IDataType>(API.categoryGoodsSale)
}

export function getCategoryGoodsFavor() {
  return bjRequist.get<IDataType>(API.categoryGoodsFavor)
}

export function getAddressGoodsSale() {
  return bjRequist.get<IDataType>(API.addressGoodsSale)
}
