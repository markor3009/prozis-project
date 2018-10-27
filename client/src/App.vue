<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import store from './vuex/store.js'
export default {
  name: 'App',
  store,
  created(){
    this.$store.dispatch('fetchBuyers')
  }
}
</script>
<style src="./assets/css/multiselect.css"></style>
<style>
#app{
  margin: 0px;
  padding: 0px;
  min-height: 100vh;
  width: 100%;
  font-family: 'Lato';
  font-size: 14px;
}
</style>
