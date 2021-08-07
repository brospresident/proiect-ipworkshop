<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'App',
  mounted: function () {
    const user = window.localStorage.getItem('user')
    if (user && user !== '' && this.$route.path !== '/dashboard') {
      this.$router.push('/dashboard')
    } else if (this.$route.path !== '/login') {
      this.$router.push('/login')
    }
  },
  data () {
    return {}
  }
})
</script>
