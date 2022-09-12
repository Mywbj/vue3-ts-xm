export const contentTableConfig = {
  title: '菜单列表',
  propList: [
    {prop: 'name', label: '菜单昵称', minWidth: '100'},
    {prop: 'url', label: '菜单地址', minWidth: '100'},
    {prop: 'createAt', label: '创建时间', minWidth: '200'},
    {prop: 'updateAt', label: '更新时间', minWidth: '200'},
    {prop: 'handler', label: '操作', minWidth: '150'},
  ],
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  showFooter: false
}
