<template lang="html">
  <div class="wrapper">
    <div class="content">
      <span id="close" @click="closePopup">X</span>
      <div class="title">
        <span>DETALJI FAKTURE</span>
      </div>
      <!-- <div id="controls">
        <label>Izaberi datum unosa: </label>
        <date-picker
         id="datepicker"
         v-model="entryDate"
         ></date-picker>
      </div> -->
      <div class="content-list">
        <table>
          <tr id="rawname">
            <th class="firstTD">Naziv proizvoda</th>
            <th>Kolicina</th>
            <th>Cena</th>
            <th>Iznos</th>
          </tr>
          <tr v-for="(p, index) in items" :key="p.stk_id">
            <td class="firstTD">{{p.pro_naziv}}</td>
            <td class="kolicina">{{p.stk_kolicina}}</td>
            <td>{{p.stk_cena}}</td>
            <td>{{p.stk_kolicina*p.stk_cena}}</td>
            <td class="remove-item"><span title="Izbriši stavku" @click="removeItem(p.stk_id, index)">X</span></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {bus} from '../../main'
import {mapActions} from 'vuex'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
export default {
  data () {
    return {
      entryDate:''
    }
  },
  props:['items', 'buyer'],
  methods: {
    ...mapActions({
      'deleteItem': 'deleteItem'
    }),
    closePopup () {
      bus.$emit('closeDetails')
    },
    sameDate(a,b) {
      return true;
    },
    removeItem(stkId, index){
      this.deleteItem(stkId).then(() => {
        this.items.splice[index]
        bus.$emit('deletedItem', this.buyer)
      })
    }
  },
  computed: {
  },
  components:{
    'date-picker': flatPickr
  },
  created(){
    this.entryDate = Date.now()

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
    height: 80%;
    margin: auto;
    top: 15%;
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
  #controls{
    text-align: center
  }
  #datepicker{
    display: inline-block;
    margin: 5px auto;
    text-align: center;
  }
  table{
    display: block;
    margin: auto;
  	width: 100%;
    height: 400px;
    overflow-y: scroll;
  	text-align: right;
  	border-bottom: 1px solid #4E342E;
  	font-size: 14px;
  }
  table tr th{
  	padding: 5px;
  	margin-left: 20px;
  }
  table tr td{
  	padding: 5px;
    width: 70px;
  }
  table tr:nth-of-type(2n){
  	background-color: #D7CCC8;
  }
  .firstTD{
  	text-align:left;
  	font-weight: normal;
    width: 70%;
  }
  #rawname .firstTD{
  	font-weight: bold;
  }
  .kolicina{
  	text-align: center;
  }
  .poljeKol{
    text-align: center;
  	width: 30px;
  }
  .remove-item{
    text-align: center;
    width: 10%;
  }
  .remove-item span{
    font-size: 10px;
    font-weight: bold;
    display: inline-block;
    width: 10px;
    cursor: pointer;
    border: 1px solid #4E342E;
    padding: 5px;
    border-radius: 25px;
  }
  .remove-item span:hover{
    background-color: rgb(237, 186, 186);

  }
</style>
