import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '默认',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色昵称',
      placeholder: '请输入角色昵称'
    },
    {
      field: 'intro',
      type: 'input',
      label: '权限介绍',
      placeholder: '请输入权限介绍'
    },
  ],
  colLayout: {
    span: 24
  },
}

export const slots = [{name: 'tree', label: '分配权限'}]
