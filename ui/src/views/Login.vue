<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center v-if='page === 0'>
      <v-layout align-center justify-center>
        <v-alert
          :value="inc"
          style="position: fixed; bottom: 0; right: 0;"
          type="error"
          transition="scale-transition"
        >
          {{ error }}
        </v-alert>
        <v-scale-transition>
          <v-card>
            <v-card-title style="background-color:#1f1f1f; margin-bottom:25px">
              <div class="d-flex align-center">
                <span style="color:white">
                  Login
                </span>
              </div>
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  id="login"
                  v-model="username"
                  label="Username"
                  name="login"
                  type="text"
                  autocomplete="on"
                  rounded
                  outlined
                  prepend-icon="mdi-account-circle mdi-36px"
                  @keyup.enter="loginFunction()"
                ></v-text-field>

                <v-text-field
                  id="password"
                  v-model="password"
                  label="Password"
                  name="password"
                  type="password"
                  autocomplete="on"
                  rounded
                  outlined
                  prepend-icon="mdi-key-variant mdi-36px"
                  @keyup.enter="loginFunction()"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-col class="justify-center">
                <v-row class="justify-center">
                  <v-btn dark rounded height="40" width="300" @click="loginFunction()">Login</v-btn>
                </v-row>
                <v-row class = "justify-center">
                  <v-btn rounded height="40" width="300" @click="page = 1 - page">Go to register</v-btn>
                </v-row>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-scale-transition>
      </v-layout>
    </v-layout>

    <v-layout align-center justify-center v-else>
      <v-layout align-center justify-center>
        <v-alert
          :value="inc"
          style="position: fixed; bottom: 0; right: 0;"
          type="error"
          transition="scale-transition"
        >
          {{ error }}
        </v-alert>
        <v-scale-transition>
          <v-card>
            <v-card-title style="background-color:#1f1f1f; margin-bottom:25px">
              <div class="d-flex align-center">
                <span style="color:white">
                  Register
                </span>
              </div>
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  id="register"
                  v-model="username"
                  label="Username"
                  name="login"
                  type="text"
                  autocomplete="on"
                  rounded
                  outlined
                  prepend-icon="mdi-account-circle mdi-36px"
                  @keyup.enter="registerFunction()"
                ></v-text-field>

                <v-text-field
                  id="password"
                  v-model="password"
                  label="Password"
                  name="password"
                  type="password"
                  autocomplete="on"
                  rounded
                  outlined
                  prepend-icon="mdi-key-variant mdi-36px"
                  @keyup.enter="registerFunction()"
                ></v-text-field>

                <v-text-field
                  id="email"
                  v-model="email"
                  label="Your email"
                  name="email"
                  type="email"
                  autocomplete="on"
                  rounded
                  outlined
                  prepend-icon="mdi-email mdi-36px"
                  @keyup.enter="registerFunction()"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-col class="justify-center">
                <v-row class="justify-center">
                  <v-btn dark rounded height="40" width="300" @click="registerFunction()">Register</v-btn>
                </v-row>
                <v-row class = "justify-center">
                  <v-btn rounded height="40" width="300" @click="page = 1 - page">Go to login</v-btn>
                </v-row>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-scale-transition>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
export default Vue.extend({
  name: 'Login',
  computed: {
    ...mapGetters({
      numere: 'store/numere'
    })
  },
  data () {
    return {
      username: '',
      password: '',
      inc: false,
      page: 0,
      error: '',
      email: ''
    }
  },
  methods: {
    async createRequest () {
      try {
        const parametru = 'DATA'
        const options: AxiosRequestConfig = {
          method: 'GET',
          url: `${this.$store.getters.API_URL}/user/data/${parametru}`,
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`
          }
        }
        const response: AxiosResponse<string> = await axios(options)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    },
    async loginFunction ():Promise<void> {
      try {
        const options: AxiosRequestConfig = {
          method: 'POST',
          url: `${this.$store.getters.API_URL}/users/login`,
          data: {
            name: this.username,
            password: this.password
          }
        }
        const response: AxiosResponse = await axios(options)
        if (response.status === 200 && response.data) {
          const user = {
            name: response.data.name,
            friends: response.data.friends,
            authorized: response.data.authorized
          }
          window.localStorage.setItem('user', JSON.stringify(user))
          this.$router.push('/dashboard')
        } else {
          this.inc = true
          this.error = response.data.error
          setTimeout(() => {
            this.inc = false
          }, 5000)
        }
        // if (response.data && response.data !== '') {
        //   window.localStorage.setItem('token', response.data)
        //   this.$router.push('/dashboard')
        // } else {
        //   this.inc = true
        //   setTimeout(() => {
        //     this.inc = false
        //   }, 5000)
        // }
      } catch (error) {
        console.error(error)
      }
    },
    async registerFunction ():Promise<void> {
      try {
        const options: AxiosRequestConfig = {
          method: 'POST',
          url: `${this.$store.getters.API_URL}/users/register`,
          data: {
            name: this.username,
            password: this.password,
            email: this.email
          }
        }

        const response: AxiosResponse = await axios(options)
        if (response.status === 200 && response.data) {
          const user = {
            name: response.data.name,
            friends: response.data.friends,
            authorized: response.data.authorized
          }
          window.localStorage.setItem('user', JSON.stringify(user))
          this.$router.push('/dashboard')
        } else {
          this.inc = true
          this.error = response.data.error
          setTimeout(() => {
            this.inc = false
          }, 5000)
        }
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
  },
  watch: {}
})
</script>
