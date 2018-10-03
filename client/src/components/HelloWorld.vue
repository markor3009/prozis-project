<template>
  <div class="hello">
    <input type="text" v-model="email" placeholder="email">
    <button type="button" name="button" @click="register">REGISTER</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'HelloWorld',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    async register(){
      const response = await AuthenticationService.register({
        email: this.email
      })
      console.log(response);
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
