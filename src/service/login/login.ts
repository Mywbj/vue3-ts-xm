import bjRequest from '..'
import type { IAccount, ILoginResult, IMenuItem } from './types'
import type { IDataType } from '../types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

export const accountLoginRequest = (account: IAccount) => {
  return bjRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
    isShowLoading: true
  })
}

export const requestUserInfoById = (id: number) => {
  return bjRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  })
}

export const requestUserMenusByRoleId = (id: number) => {
  return bjRequest.get<IDataType<IMenuItem[]>>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
