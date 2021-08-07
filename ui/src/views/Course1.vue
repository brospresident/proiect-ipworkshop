<template>
  <div>
    <div v-if="true">
      <h1>{{defaultNumar}}</h1>
      <span>Parola</span>
      <input v-model="text"/>
      <button v-on:click="emiteEveniment()">Trimite parola</button>
      <div v-if="isNegative" style="border:2px solid red; color:red">
        <h2>Erroare</h2>
        <span>Nu putem avea numere mai mici decat 0!</span>
      </div>

      <div v-else style="border:2px solid green; color:green">
        <h2>Success</h2>
        <span>Putem avea numere mai mari decat 0!</span>
      </div>
      <div style="border:2px solid grey; color:grey">
        <button v-bind:disabled="!parolaCorecta" v-on:click="scadeNumar()">Scade</button>
        <button v-bind:disabled="!parolaCorecta" v-on:click="cresteNumar()">Creste</button>
      </div>
    </div>
    <div v-if="true">
      <span>Numele participantului</span>
      <input v-model="participant"/>
      <div style="border:2px solid grey; color:grey">
        <button v-on:click="adaugaParticipant()">Adauga</button>
      </div>
      <div id="listaDeNume">
        <template v-for="(part, index) of participanti">
          <p v-bind:key="index">{{part}}</p>
        </template>
      </div>
      <p>
        {{part2}}
      </p>
      <p>
        {{participant}}
      </p>
    </div>
    <h1 style="color:green">{{numere}}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
  name: 'Course1',
  mounted () {
    this.defaultNumar = this.numar
  },
  props: {
    numar: {
      type: Number,
      default: () => -1
    }
  },
  components: {
  },
  data () {
    const isNegative = false
    const text = 'Parola gresita'
    const participanti:string[] = []
    return {
      defaultNumar: 0,
      isNegative: isNegative,
      text: text,
      parolaCorecta: false,
      participant: '',
      participanti: participanti,
      part: ''
    }
  },
  methods: {
    emiteEveniment () {
      this.$emit('trimite-parola', this.text)
    },
    adaugaParticipant () {
      this.participanti.push(this.participant)
      this.participant = ''
    },
    cresteNumar () {
      this.defaultNumar = this.numar + 1
    },
    scadeNumar () {
      if (!this.isNegative) {
        this.defaultNumar = this.numar - 1
      }
    }
  },
  computed: {
    part2 ():string {
      return this.participant + this.numar + this.isNegative
    },
    ...mapGetters({
      numere: 'store/numere'
    })
  },
  watch: {
    numar () {
      if (this.numar <= 0) {
        this.isNegative = true
      } else {
        this.isNegative = false
      }
    },
    text () {
      if (this.text === 'parola') {
        this.parolaCorecta = true
      } else {
        this.parolaCorecta = false
      }
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
