// 账号密码验证规则
export const rules = {
  username: [
    {
      required: true,
      message: '账号是必转内容',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{2,10}$/,
      message: '账号必须是2-10为字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必转内容',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{6,}$/,
      message: '密码必须是6位以上字母或数字',
      trigger: 'blur'
    }
  ]
}
