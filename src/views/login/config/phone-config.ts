export const rules = {
  phoneNum: [
    {
      required: true,
      message: '手机号是必填内容',
      trigger: 'blur'
    },
    {
      pattern:
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
      message: '手机号格式错误',
      trigger: 'blur'
    }
  ]
}
