import axios from 'axios'
import store from '@/store'
import apiAuthority from '@/config/apiAuthority'
import cookiesUtil from '@/util/cookiesUtil'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: 'http://localhost:8088',
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = cookiesUtil.get('token')
    if (token) config.headers.Authorization = 'Bearer' + token
    else if (apiAuthority.indexOf(config.url) !== -1) {
      store.commit('dialog/setLoginRegisterVisible', true)
      throw new Error('未登录')
    }
    return config
  },
  error => {
    // 发送失败
    console.error(error.message)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const dataAxios = response.data
    const { code, message } = dataAxios
    console.log(dataAxios)

    if (code !== 200) throw new Error(message)

    return dataAxios.data

    // 后期需要在这里拦截token过期或无效的状态码
    // 这时的动作应该是在页面上弹出登录窗体
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    return Promise.reject(error)
  }
)
export default service
