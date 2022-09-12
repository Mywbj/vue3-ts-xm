let BASE_URL = ''
const TIME_OUT = 10000
// 开发环境：development
// 生产环境：production
// 测试环境：test
if (process.env.NODE_ENV === 'development') {
  // BASE_URL = 'http://123.207.32.32:8000'
  BASE_URL = '/api' // 代理
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'yyy'
}

export { BASE_URL, TIME_OUT }
