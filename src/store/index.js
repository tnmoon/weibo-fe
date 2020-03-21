import Vue from 'vue'
import Vuex from 'vuex'
import account from './account'
import dialog from './dialog'
import timeline from './timeline'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account,
    dialog,
    timeline
  }
})
