<template lang="html">
  <div class="wrapper">
    <header>
  		<h1><i class="far fa-calendar-check"></i>KUPCI</h1>
   	</header>
    <div id="controls"><multiselect :options="buyers" label="kup_naziv" v-model="selected" @input="reset"></multiselect>
    <span @click="createNewBuyer">+DODAJ NOVOG KUPCA</span></div>
    <ul id="basic-info">
      <li><h3>OSNOVNE INFORMACIJE</h3></li>
      <li><label>Ime Prezime: </label><input type="text" v-model="selected.kup_naziv"></li>
      <li><label>Pozivni broj: </label><input type="text" v-model="selected.kup_pozbr"></li>
      <li><label>Adresa: </label><input type="text" v-model="selected.kup_adresa"></li>
      <li><label>PIB: </label><input type="text" v-model="selected.kup_pib"></li>
    </ul>
    <table>
      <tr>
        <th>Ime proizvoda</th>
        <th>Cena proizvoda</th>
      </tr>
      <tr v-for="p in selected.prices" :key="p.pro_id">
        <td class="firstTD">{{p.pro_naziv}}</td>
        <td><input v-model="p.cen_cena"></td>
      </tr>
    </table>
    <div class="buttons" v-if="changed">
      <button id="save-button" @click="save">Sacuvaj izmene</button>
      <button id="reset-button" @click="reset">Odbaci izmene</button>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'Buyers',
  data () {
    return {
      selected: null,
      buyers: []
    }
  },
  methods: {
    ...mapActions({
      'updateBuyers': 'updateBuyers',
      'fetchBuyers': 'fetchBuyers',
      'fetchPrices': 'fetchPrices',
      'fetchProducts': 'fetchProducts',
      'addBuyer': 'addBuyer'
    }),
    createNewBuyer () {
      var buyer = {
        kup_naziv: '',
        kup_pozbr: '',
        kup_adresa: '',
        kup_pib: '',
        prices: JSON.parse(JSON.stringify(this.products))
      }
      this.selected = buyer
    },
    update(){
      this.updateBuyers(this.selected).then(() => {
          this.fetchBuyers()
            .then(() => {
              this.buyers = JSON.parse(JSON.stringify(this.buyersSource))
              alert('IZMENE SACUVANE');
            })
      }).catch(() => {
        alert('krenulo po zlu')
      })
    },
    saveNewBuyer(){
      this.addBuyer(this.selected).then(() => {
        this.fetchBuyers()
          .then(() => {
            this.buyers = JSON.parse(JSON.stringify(this.buyersSource))
            alert('SACUVAN NOVI KUPAC');
          })
      }).catch(() => {
        alert('po zlu')
      })
    },
    save () {
      if(this.selected.kup_pib != '' && this.selected.kup_naziv != '' && this.selected.kup_adresa != '' && this.selected.kup_pozbr != ''){
        var empty = 0
        for (var i = 0; i < this.selected.prices.length; i++) {
          if(this.selected.prices[i].cen_cena !== '' && this.selected.prices[i].cen_cena !== '0'){
            empty++;
          }
        }
        if(empty == 0){
          alert("Unesite cenu za bar jedan prozivod.")
        }else{
          console.log('ovo je kupac koga saljem negde....'+this.selected);
          if (this.selected.kup_id !== undefined) {
            console.log('na update ga saljem');
            this.update()
          }else{
            console.log('na kreiranje ga saljem');
            this.saveNewBuyer()
          }
        }
      }else{
      alert("Sva polja su obavezna. Unesite sve informacije o kupcu.")
      }
    },
    reset(){
      if(this.selected.kup_id !== undefined){
        var id = this.selected.kup_id
        for (var i = 0; i < this.buyersSource.length; i++) {
          if(id == this.buyersSource[i].kup_id){
            this.selected = JSON.parse(JSON.stringify(this.buyersSource[i]))
          }
        }
      }else{
        this.selected = JSON.parse(JSON.stringify(this.buyersSource[this.buyersSource.length-1]))
      }
    }
  },
  computed: {
    ...mapGetters({
      'buyersSource': 'getBuyers',
      'products': 'getProducts'
    }),
    changed(){
      for (var i = 0; i < this.buyersSource.length; i++) {
        if(this.selected.kup_id == this.buyersSource[i].kup_id){
          if (JSON.stringify(this.selected) == JSON.stringify(this.buyersSource[i])) {
            return false
          }
        }
      }
      return true
    }
  },
  components: {
    'multiselect': Multiselect
  },
  created () {
    this.buyers = JSON.parse(JSON.stringify(this.buyersSource))
    this.selected = this.buyers[0]
    this.fetchProducts()
  }
}
</script>

<style lang="css" scoped>
header{
  display: block;
	text-align: center;
	color: #fff;
	background-color: #8D6E63;
	margin: auto;
	height: 50px;
  width: 640px;
}
header h1{
	margin: 0;
	padding: 0;
	line-height: 50px;
	font-weight: normal;
  font-size: 20px;
}
header i{
	color: white;
	margin-right: 10px;
}
#basic-info{
  padding: 20px;
  margin-left: 10%;
  margin-right: 10%;
  float: left;
  display: inline-block;
  list-style: none;
  border: 1px solid #4E342E;
  font-size: 14px;
}
#basic-info h3{
  text-align: center;
  margin-top: 5px;
  margin-bottom: 30px;
  color: #4E342E;
}
#basic-info li{
  margin-bottom: 20px;
}
#basic-info li label{
  margin-right: 15px;
}
#basic-info li input{
  float: right;
  padding: 5px;
}
#controls{
  margin: 20px 0px;
  text-align: center;
}
.multiselect{
  display: inline-block;
  width: 25%;
  margin-right: 20px;
}
#controls span{
  display: inline-block;
  margin-left: 20px;
  padding: 10px;
  font-size: 14px;
  background-color: #D7CCC8;
	font-weight: bold;
	color: #4E342E;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
}
#controls span:hover{
  background-color: #B49F98;
	color: #fff;
	border: none;
}
table{
  font-size: 14px;
  width: 30%;
  text-align: left;
	border-bottom: 1px solid #4E342E;
	font-size: 14px;
}
table tr{
  border-bottom: 1px solid blue;
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
table tr:nth-of-type(2n-1) input{
	border: 1px solid rgb(161, 144, 117);
}
.firstTD{
	text-align:left;
	font-weight: normal;
  width: 70%;
}
table label{
  display: block;
}
table input{
  width: 30px;
  text-align: center;
  display: block;
  margin: auto;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  padding: 3px;
}
.buttons{
  text-align: right;
  margin-top: 10px;
  margin-right: 20%;
}
.buttons button{
  display: inline-block;
  margin-top: 2%;
  margin-right: 1%;
  font-size: 14px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: #8D6E63;
  color: #fff;
  cursor: pointer;
}
.buttons button:hover{
  background-color: #D7CCC8;
  color: #8D6E63;
  border: 2px solid #8D6E63;
  cursor: pointer;
}
</style>
