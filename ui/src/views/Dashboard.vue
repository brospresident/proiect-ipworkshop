<template>
  <v-container>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon v-on:click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn dark shaped v-on:click="change('home')">
        <span>Aplicația noastră</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-on:click="createRequest()">
        Request
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            v-bind="attrs"
            v-on="on"
          >
            Menu
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item v-on:click="logout()">
            <v-list-item-icon>
              <v-icon>
                mdi-logout
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>
                Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer app clipped v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
           <span>Aplicația noastră</span>
          </v-list-item-title>
          <v-list-item-subtitle>
            IP Workshop Course
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item v-for="(link, index) in pageArray" :key="index" v-bind:to="link.path">
          <v-list-item-icon>
            <v-icon>
            {{link.icon}}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{link.name}}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-main>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
  name: 'Dashboard',
  computed: {
    ...mapGetters({
      numere: 'store/numere'
    })
  },
  data () {
    const number = '13'
    const pageArray = [
      {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'mdi-home'
      },
      {
        name: 'Course 1',
        path: '/course1',
        icon: 'mdi-camera-account'
      },
      {
        name: 'Course 2',
        path: '/course2',
        icon: 'mdi-folder-account'
      },
      {
        name: 'Views',
        path: '/views',
        icon: 'mdi-camera'
      },
      {
        name: 'Friends',
        path: '/friends',
        icon: 'mdi-contacts'
      }
    ]
    return {
      number: number,
      drawer: false,
      pageArray: pageArray
    }
  },
  methods: {
    async createRequest () {
      try {
        const parametru = 'DATA'
        await this.$store.dispatch('store/createRequest', parametru)
      } catch (error) {
        console.error(error)
      }
    },
    logout () {
      window.localStorage.setItem('user', '')
      this.$router.push('/login')
    },
    addNumber () {
      this.$store.commit('store/numere', this.number)
    },
    replaceArray () {
      this.$store.dispatch('store/replace', [420, 69, 12, 13, 201])
    },
    change (to:string) {
      if (to === 'course1') {
        this.$router.push('/course1')
      } else if (to === 'course2') {
        this.$router.push('/course2')
      } else if (to === 'home') {
        this.$router.push('/dashboard')
      }
    }
  },
  watch: {}
})
</script>
