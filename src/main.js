/**
 * created by lishuhang in 2020.
 */

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
import store from './store/index'

import '@/mock'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    this.$store.dispatch('account/load')
  }
}).$mount('#app')
