import { IForm } from "@/base-ui/form";

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  itemStyle: {
    padding: '10px 40px'
  },
  colLayout: {
    xl: 6,
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '菜单昵称',
      placeholder: '请输入菜单昵称'
    },
    {
      field: 'url',
      type: 'input',
      label: '菜单地址',
      placeholder: '请输入菜单地址'
    },
    {
      field: 'createTime',
      type: 'date',
      label: '创建时间',
      placeholder: '请选择创建时间范围',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
