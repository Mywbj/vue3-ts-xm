import { createApp } from 'vue'

import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
import globalRegister from './global'

const app = createApp(App)
// 先加载好数据再注册路由
setupStore()
app.use(router)
app.use(store)
globalRegister(app)
app.mount('#app')
