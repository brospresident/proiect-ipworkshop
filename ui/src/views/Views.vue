<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col
        v-for="(img, index) in images"
        :key="index"
        class="d-flex child-flex"
        cols="4"
      >
        <v-img
          :src="img.src"
          aspect-ratio="1"
          class="grey lighten-2"
          alt='poza'
        >
        </v-img>
      </v-col>
      <v-col>
        <video :src="video[0].src" controls></video>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Views',
  data () {
    const images = [
      {
        src: require('../media/1.jpg')
      },
      {
        src: require('../media/2.jpg')
      },
      {
        src: require('../media/3.jpg')
      },
      {
        src: require('../media/4.jpg')
      }
    ]
    const video = [
      {
        src: require('../media/video.mp4')
      }
    ]
    return {
      images: images,
      video: video
    }
  }
})
</script>
