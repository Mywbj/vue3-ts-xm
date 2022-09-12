
export interface IListDataState {
  usersList: any[]
  usersCount: number,
  roleList: any[],
  roleCount: number,
  goodsList: any[],
  goodsCount: number,
  menuList: any[],
  menuCount: number
}

export enum listKeys {
  GET_PAGE_LIST_ACTION = 'getPageListAction',
  DELETE_PAGE_DATA_ACTION = 'deletePageDataAction',
  CREATE_PAGE_DATA_ACTION = 'createPageDataAction',
  EDIT_PAGE_DATA_ACTION = 'editPageDataAction'
}
