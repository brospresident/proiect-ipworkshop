<template>
  <div style="color:red">
    <Course1 v-bind:numar="data" v-on:trimite-parola="afiseazaParola">
    </Course1>
    <h1>{{parolaCurenta}}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Course1 from './Course1.vue'
export default Vue.extend({
  name: 'Course2',
  components: {
    Course1: Course1
  },
  data () {
    const data = 13
    return {
      data: data,
      parolaCurenta: ''
    }
  },
  methods: {
    afiseazaParola (value:string) {
      console.log('Am primit eveniment')
      this.parolaCurenta = value
    }
  },
  computed: {
  },
  watch: {
  }
})
</script>

<style lang="css">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
