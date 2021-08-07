import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'

Vue.use(Vuex)

const baseStore = new Vuex.Store({
  state: {
    version: '1',
    API_URL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000/api'
  },
  getters: {
    API_URL: state => state.API_URL
  }
})
baseStore.registerModule('store', store())
export default baseStore
