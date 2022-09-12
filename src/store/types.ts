import { ILoginState } from "./login/types"
import { IListDataState } from "./main/list-data/types"
import { IDashboardState } from './main/analysis/types'

export interface IRootState {
  entireDeparment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  login: ILoginState
  listData: IListDataState
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
