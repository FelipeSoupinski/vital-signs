import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(router)
Vue.use(vuetify)

new Vue({
  render: h => h(App)
}).$mount('#app')
