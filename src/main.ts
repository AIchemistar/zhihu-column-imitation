import { createApp } from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'
import App from './App.vue'

const app = createApp(App)
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: '403C768F06519C3A' }
  if (config.data instanceof FormData) {
    config.data.append('icode', '403C768F06519C3A')
  } else {
    config.data = { ...config.data, icode: '403C768F06519C3A' }
  }
  return config
})
axios.get('/columns').then(resp => {
  console.log(resp.data)
})
app.use(router)
app.use(store)
app.mount('#app')
