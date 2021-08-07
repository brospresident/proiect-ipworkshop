import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// import Course1 from './views/Course1.vue'

Vue.config.productionTip = false

// Vue.component('Course1', Course1)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
