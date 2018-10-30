<template>
  <div class="hello">
    <input type="text" v-model="user.username" placeholder="username">
    <input type="text" v-model="user.password" placeholder="password">
    <button type="button" name="button" @click="loginUser">LOGIN</button>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      'register': 'register',
      'loginU': 'login',
      'fetchBuyers': 'fetchBuyers'
    }),
    registerUser(){
      this.register().then((response)=>{
        console.log(response);
      })
    },
    loginUser(){
      this.loginU(this.user).then(() => {
        this.fetchBuyers()
        this.$router.push('/')
      }).catch(() => {
        alert('not Good!')
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
