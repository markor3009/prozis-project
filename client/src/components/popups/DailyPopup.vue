<template lang="html">
  <div class="wrapper">
    <div class="content">
      <span id="close" @click="closePopup">X</span>
      <div class="title">
        <span>DODAJ U FAKTURU</span>
      </div>
      <div class="question" v-if="!showMessage">
        <p>Da li ste sigurni da želite da dodate stavke u fakturu?</p>
        <button @click="confirm">DA</button>
        <button @click="closePopup">NE</button>
      </div>
      <p v-if="showMessage" class="message">Stavke uspešno unete!</p>
    </div>
  </div>
</template>

<script>
import {bus} from '../../main'
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      showMessage: false
    }
  },
  props:['items'],
  methods: {
    ...mapActions({
      'addItems': 'addItems'
    }),
    closePopup () {
      bus.$emit('closePopup')
    },
    confirm () {
      this.addItems(this.items).then(() =>{
        this.showMessage = true
        setTimeout(() => {
          this.closePopup()
        }, 700)
      }).catch(() => {
        alert('issue')
      })
      this.showMessage = true
      setTimeout(() => {
        this.closePopup()
      }, 700)
    }
  }
}
</script>

<style lang="css" scoped>
  .wrapper{
    position: fixed;
    top:0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    z-index: 10000;
  }

  .content{
    position: absolute;
    background-color: white;
    display: inline-block;
    width: 40%;
    height: 50%;
    margin: auto;
    top: 25%;
    left: 30%;
  }
  #close{
    position: relative;
    top: -20px;
    float: right;
    right: -15px;
    font-size: 15px;
    border: 1px solid rgb(76, 65, 93);
    border-radius: 25px;
    padding: 5px;
    width: 20px;
    height: 20px;
    text-align: center;
    vertical-align: middle;
    background-color: white;
    color: rgb(76, 65, 93);
    background-color: #8D6E63;
    color: #fff;
    border: 1px solid white;
  }
  #close:hover{
    background-color: white;
    color: rgb(76, 65, 93);
    border: 1px solid rgb(76, 65, 93);
    cursor: pointer;
  }
  .title{
    width: 100%;
    background-color: silver;
    font-size: 15px;
    text-align: center;
  }
  .title span{
    display: inline-block;
    height: 100%;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  .question {
    text-align: center;
  }
  .question p{
    margin-top: 15%;
    margin-bottom: 50px;
  }
  .question button{
    margin-right: 30px;
    padding: 10px 10px;
    width: 70px;
    border: none;
    cursor: pointer;
    background-color: #8D6E63;
    color: #fff;
    border-radius: 5px;
  }
  .question button:hover{
    background-color: #D7CCC8;
    color: #8D6E63;
    border: 1px solid #8D6E63;
    cursor: pointer;
  }
  .message{
    text-align: center;
    margin: 20%;
  }
</style>
