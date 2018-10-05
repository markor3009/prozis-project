<template>
  <div class="hello">
    <input type="text" v-model="email" placeholder="email">
    <button type="button" name="button" @click="registerUser">REGISTER</button>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    ...mapActions({
      'register': 'register'
    }),
    registerUser(){
      this.register().then((response)=>{
        console.log(response);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
