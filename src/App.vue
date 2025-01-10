<template>
  <div id="app">
    <LayOut></LayOut>
  </div>
</template>

<script>
import LayOut from './components/LayOut.vue'
// import LogPage from './components/LogIn.vue'

export default {
  name: 'App',
  components: {
    LayOut
    // LogPage
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 97vh;
}
</style>
