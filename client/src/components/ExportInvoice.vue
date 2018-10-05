<template lang="html">
  <div class="wrapper">
    <div class="content">
      <span id="close" @click="closePopup">X</span>
      <div class="title">
        <span>Faktura {{buyer.name}}</span>
      </div>
      <table class="invForm">
        <tr>
          <td>Broj fakture:</td>
          <td><input type="text" v-model="invNumber"/></td>
        </tr>
        <tr>
          <td>Datum izdavanja robe:</td>
          <td><input type="date" v-model="invDate"/></td>
        </tr>
        <tr>
          <td>Valuta placanja fakture:</td>
          <td><input type="date" v-model="invExtDate"/></td>
        </tr>
      </table>
      <button type="button" id="out-button" @click="exportInv">Izdaj fakturu</button>
      <span id="message" v-if="showMessage">
        {{message}}
      </span>
    </div>
  </div>
</template>

<script>
import {bus} from '../main'
export default {
  props: ['buyer'],
  data () {
    return {
      invNumber: '',
      invDate: '',
      invExtDate: '',
      message : 'Sva polja su obavezna!',
      showMessage: false
    }
  },
  methods: {
    closePopup () {
      bus.$emit('closeExport')
    },
    exportInv () {
      if(this.invNumber!=='' && this.invDate !== '' && this.invExtDate !== ''){
        this.buyer.invNumber = this.invNumber;
        this.buyer.invDate = this.invDate;
        this.buyer.invExtDate = this.invExtDate;
        this.$router.push({name: 'faktura', params: {buyer: this.buyer}})
      }else{
        this.showMessage = true
      }
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
#close-button{
  color: rgb(170, 170, 170);
  font-size: 50px;
  display: inline-block;
  text-align: center;
  padding: 10px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  float: right;
  margin-top: 10px;
  margin-right: 15px;
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
  font-size: 20px;
  border: 1px solid rgb(76, 65, 93);
  border-radius: 25px;
  padding: 7px;
  width: 20px;
  height: 20px;
  text-align: center;
  background-color: white;
  color: rgb(76, 65, 93);
  background-color: rgb(76, 65, 93);
  border: 1px solid white;
  color: white;
}
#close:hover{
  background-color: white;
  color: rgb(76, 65, 93);
  border: 1px solid rgb(76, 65, 93);
  cursor: pointer;
}
.title{
  height: 10%;
  width: 100%;
  background-color: silver;
  font-size: 20px;
  text-align: center;
}
.title span{
  display: inline-block;
  height: 100%;
  margin-top: 10px;
}
.invForm{
  width: 70%;
  margin-top: 5%;
  margin-left: 20%;
  border: none;
  border-collapse:collapse;
}
.invForm tr{
  height: 50px;
}
.invForm tr button{
  margin: auto;
}
#out-button{
  display: block;
  margin: 50px auto;
  font-size: 14px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: rgb(76, 65, 93);
  color: white;
  cursor: pointer;
}
#out-button:hover{
  background-color: rgb(188, 238, 153);
  color: black;
}
#message {
  display: inline-block;
  width: 100%;
  text-align: center;
  color: red;
}
</style>
