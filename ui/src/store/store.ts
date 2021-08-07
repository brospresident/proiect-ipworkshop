import Vue from 'vue'
import Vuex, { Module } from 'vuex'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

Vue.use(Vuex)
interface State {
  numere: number[]
}
interface RootState {
  version: string,
  API_URL: string
}
const NO_NUMBERS: number[] = []

export default function store (): Module<State, RootState> {
  const store: Module<State, RootState> = {
    namespaced: true,
    state: {
      numere: NO_NUMBERS
    },
    getters: {
      numere: state => state.numere
    },
    mutations: {
      numere: (state, newNumber:string) => {
        state.numere.push(parseInt(newNumber))
      }
    },
    actions: {
      replace (storeParam, numberArray:number[]):boolean {
        if (numberArray.length > 0) {
          storeParam.state.numere = numberArray
          return true
        } else {
          return false
        }
      },
      async createRequest (storeParam, data) {
        try {
          const options: AxiosRequestConfig = {
            method: 'GET',
            url: `${storeParam.rootState.API_URL}/user/data/${data}`,
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
          }
          const response: AxiosResponse<string> = await axios(options)
          console.log(response.data)
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
  return store
}
