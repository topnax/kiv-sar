<template>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import store from './store'
import {mapActions} from "vuex"
import testData from '@/assets/data/test-data.json'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    ...mapActions(["loadInitialData"])
  },
  store,
  mounted() {
    this.loadInitialData(testData)
  }
}
</script>

<style>

</style>
