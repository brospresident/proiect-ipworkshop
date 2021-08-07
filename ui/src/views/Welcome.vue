<template>
    <v-container fluid fill-height>
      <v-layout  align-center justify-center column>
        <h1>Bun venit la IPWorkshop!</h1>
        <p class='text-md-body-1'>
          La anu se face fizic
        </p>
        <v-card>
          <v-card-title style="background-color:#70B3ED; margin-bottom:15px">
            Cursurile IPWorkshop
          </v-card-title>
          <v-list width="500px">
            <v-list-item>
              <v-list-item-title>
                3D Modeling
              </v-list-item-title>
              <v-list-item-subtitle>
                1/5 difficulty
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                Internet of things
              </v-list-item-title>
              <v-list-item-subtitle>
                2/5 difficulty
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                Modern Web Applications ❤️
              </v-list-item-title>
              <v-list-item-subtitle>
                3/5 difficulty
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                Secure Embedded Programming
              </v-list-item-title>
              <v-list-item-subtitle>
                5/5 difficulty
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-layout>

    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Welcome'
})
</script>
