type IFormType = 'input' | 'password' | 'select' | 'date'

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  options?: any[]
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  title?: string
  formItems: IFormItem[]
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
}
