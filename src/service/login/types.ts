interface IAccount {
  username: string
  password: string
}

interface ILoginResult {
  id: number
  name: string
  token: string
}

interface IMenuItem {
  children: any[]
  icon?: string
  name: string
  parentId?: number
  id: number
  sort: number
  type: number
  url: string
  permission?: string
}

export {
  IAccount,
  ILoginResult,
  IMenuItem
}
