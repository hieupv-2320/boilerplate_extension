import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getter from './getter'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {  
      init: "This is vuex",
  },
  mutations: mutations,
  getters: getter,
  actions: actions
})
