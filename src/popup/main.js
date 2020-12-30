import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/vi'
import Vuex from 'vuex'
import store from './store/store.js'

Vue.use(ElementUI, { locale });
Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')