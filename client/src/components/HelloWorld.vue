<template>
  <div class="wrapper">
    <section id="login">
      <h1><i class="fas fa-lock"></i>LOG  IN</h1>
      <h2><i class="far fa-user"></i>Korisničko ime:</h2>
      <input type="text" v-model="user.username" placeholder="Korisničko ime" class="login">
      <h2><i class="fas fa-key"></i>Lozinka:</h2>
      <input type="password" v-model="user.password" placeholder="Šifra" class="login">
      <button type="button" name="button" @click="loginUser" id="loginButton">LOGIN</button>
    </section>
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
    loginUser(){
      this.loginU(this.user).then(() => {
        this.fetchBuyers()
        this.$router.push('/')
      }).catch(() => {
        alert('NEISPRAVNI PODACI!')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.wrapper {
	width:960px;
	margin:0 auto;
	overflow: hidden;
}
#login{
	width: 280px;
	margin:100px 310px 100px 310px;
	padding: 40px 30px 60px 30px;
	font-weight: normal;
	background-color: #FDFDFD;
  border: 1px solid black;
}
#login i{
	margin-right: 10px;
}
#login h1{
	text-align: center;
	margin-bottom: 50px;
}
#login h2{
	text-align: left;
	font-weight: normal;
	font-size: 16px;
	margin-left: 15px;
}
#login h2 i{
	font-size: 18px;
}
.login{
	width: 100%;
	padding: 10px 3px;
	border: 1px solid #8D6E63;
	border-radius: 7px;
	background-color: #FDFDFD;
}
.login:hover{
	background-color: #EFEBE9;
}
.login:active{
	background-color: #EFEBE9;
}
.login:focus{
	outline: #4E342E;
	background-color: #EFEBE9;
}
#loginButton{
	height: 45px;
	/*margin-left: 72px;
	margin-top: 50px;*/
	font-size: 14px;
	width: 100%;
	margin: 30px 0 0 0;
}
#loginButton:hover{
	outline: #4E342E;
  cursor: pointer;
}
#loginButton:focus{
	outline: #4E342E;
  cursor: pointer;
}
#login h2 img{
	height: 16px;
	width: 16px;
}
</style>
