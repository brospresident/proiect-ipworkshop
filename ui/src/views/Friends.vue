<template>
  <v-container fluid fill-height>
    <h1>Prieteni sau persoane pe care s-ar putea sa le cunosti</h1>
    <v-layout align-center justify-center column>
      <v-card style="margin-bottom: 25px;">
        <v-card-title style="background-color:#70B3ED; margin-bottom:15px">
          Persoane pe care s-ar putea sa le cunosti
        </v-card-title>
          <v-list centered>
            <v-list-item v-for='(person, id) in randomPeople' :key="id" style="margin-bottom:15px">
              <p class="text-center">
                Nume: {{ person.name }} <br>
                Data nasterii: {{ person.dateOfBirth }} <br>
                Inaltime: {{ person.height }} <br>
              </p>
            </v-list-item>
          </v-list>
          <v-btn dark shaped style="margin-bottom: 10px;" @click="addRandomFriend()">Adauga prieten random</v-btn>
        </v-card>
      <v-divider></v-divider>
      <v-card>
        <v-card-title style="background-color:#70B3ED; margin-bottom:15px">
          Prieteni
        </v-card-title>
          <div v-if="friends.length === 0">
            <p>Nu ai niciun prieten in lista</p>
          </div>
          <div v-else>
            <v-list centered>
              <v-list-item v-for='(person, id) in friends' :key="id" style="margin-bottom:15px">
                <p class="text-center">
                  Nume: {{ person.name }} <br>
                  Data nasterii: {{ person.dateOfBirth }} <br>
                  Inaltime: {{ person.height }} <br>
                </p>
              </v-list-item>
            </v-list>
          </div>
          <v-btn dark shaped style="margin-bottom: 10px;" @click="removeRandomFriend()">Scoate un prieten random din lista</v-btn>
          <br>
          <v-btn shaped style="margin-bottom: 10px;" @click="saveFriendList()">Salveaza lista de prieteni</v-btn>
        </v-card>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
export default Vue.extend({
  name: 'Friends',
  data () {
    return {
      randomPeople: [],
      friends: []
    }
  },
  async mounted () {
    await this.getRandomPeople()
    this.friends = this.populateFriendsList()
  },
  methods: {
    async getRandomPeople () {
      const options: AxiosRequestConfig = {
        method: 'GET',
        url: `${this.$store.getters.API_URL}/randompeople`
      }
      const response: AxiosResponse = await axios(options)
      this.randomPeople = response.data
    },
    populateFriendsList () {
      const user = window.localStorage.getItem('user')?.toString()
      const data = String(user)
      const userData = JSON.parse(data)
      console.log('User data', userData)
      return userData.friends
    },
    addRandomFriend () {
      const selectedId = Math.floor(Math.random() * this.randomPeople.length)
      this.friends.push(this.randomPeople[selectedId])
      this.randomPeople = this.randomPeople.filter((item, idx) => {
        return idx !== selectedId
      })
    },
    removeRandomFriend () {
      const selectedId = Math.floor(Math.random() * this.friends.length)
      this.randomPeople.push(this.friends[selectedId])
      this.friends = this.friends.filter((item, idx) => {
        return idx !== selectedId
      })
    },
    async saveFriendList () {
      const user = window.localStorage.getItem('user')?.toString()
      let name = ''
      if (typeof user === 'string' && user !== '') {
        const data = String(user)
        const userData = JSON.parse(data)
        name = userData.name
        const update = {
          name: name,
          authorized: true,
          friends: this.friends
        }
        window.localStorage.removeItem('user')
        window.localStorage.setItem('user', JSON.stringify(update))
      }
      const options: AxiosRequestConfig = {
        method: 'POST',
        url: `${this.$store.getters.API_URL}/users/save`,
        data: {
          name: name,
          friends: this.friends
        }
      }
      await axios(options)
    }
  }
})
</script>
