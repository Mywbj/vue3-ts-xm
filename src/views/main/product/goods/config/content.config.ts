export const contentTableConfig = {
  title: '商品列表',
  propList: [
    {prop: 'name', label: '商品名称', minWidth: '100'},
    {prop: 'oldPrice', label: '原价', minWidth: '100', defineSlot: true},
    {prop: 'newPrice', label: '现价格', minWidth: '100', defineSlot: true},
    {prop: 'imgUrl', label: '商品图片', minWidth: '100', defineSlot: true},
    {prop: 'status', label: '状态', minWidth: '200', defineSlot: true},
    {prop: 'createAt', label: '创建时间', minWidth: '200'},
    {prop: 'updateAt', label: '更新时间', minWidth: '200'},
    {prop: 'handler', label: '操作', minWidth: '150'},
  ]
}
