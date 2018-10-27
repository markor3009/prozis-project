<template lang="html">
  <div class="wrapper">
    <popup v-if="show" :items="itemsProps"></popup>
    <header>
  		<h1><i class="far fa-calendar-check"></i>DNEVNI UNOS</h1>
   	</header>
    <div id="controls">
      <multiselect
        placeholder = "Izaberi Kupca"
        :options="buyers"
        label="kup_naziv"
        v-model="selected"
        class="multiselect"
        @input="reset"
       ></multiselect>
       <date-picker
        id="datepicker"
        v-model="insertDate"
        ></date-picker>
    </div>
    <table>
      <tr id="rawname">
        <th class="firstTD">Naziv proizvoda</th>
        <th>Kolicina</th>
        <th>Cena</th>
        <th>Iznos</th>
      </tr>
      <tr v-for="(p, index) in selected.prices" :key="p.pro_naziv">
        <td class="firstTD">{{p.pro_naziv}}</td>
        <td class="kolicina"><input v-model="quantity[index]" @change="calculate" class="poljeKol"></td>
        <td>{{p.cen_cena}}</td>
        <td>{{quantity[index]*p.cen_cena}}</td>
      </tr>
      <tr id="end">
        <td class="firstTD">Total</td>
        <td colspan="3" class="total">{{total}}</td>
      </tr>
    </table>
    <button id="add-button" @click="addReq">Dodaj u fakturu</button>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Popup from '@/components/popups/DailyPopup'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import {bus} from '../main'
import {mapGetters} from 'vuex'
export default {
  name: 'Daily',
  data () {
    return {
      loading: true,
      selected: {},
      quantity: [],
      total: 0,
      show: false,
      itemsProps:{},
      insertDate:''
    }
  },
  methods: {
    calculate () {
      var t = 0
      for (var i = 0; i < this.selected.prices.length; i++) {
        var p = this.selected.prices[i]
        t += this.quantity[i] * p.cen_cena
      }
      this.total = t
    },
    addReq () {
      if (this.total !== 0) {
        var items = []
        for (var i = 0; i < this.selected.prices.length; i++) {
          if (this.quantity[i] !==0 ) {
            var itm = {
              product: this.selected.prices[i].pro_id,
              quantity: this.quantity[i],
              price: this.selected.prices[i].cen_cena
            }
            items.push(itm)
          }
        }
        var item = {
          id: this.selected.kup_id,
          items: items,
          date: this.insertDate
        }
        this.itemsProps = item
        this.show = true;
      } else{
        alert('Nema dodatih stavki')
      }
    },
    reset (){
      for (var i = 0; i < this.selected.prices.length; i++) {
        this.quantity[i] = 0
        this.total = 0
      }
    }
  },
  components: {
    'multiselect': Multiselect,
    'popup': Popup,
    'date-picker': flatPickr
  },
  computed: {
    ...mapGetters({
      'buyers': 'getBuyers'
    })
  },
  mounted () {
    this.insertDate = Date.now()
    bus.$on('closePopup', () => {
      this.show = false
      this.reset()
    })
  },
  beforeDestroy () {
    bus.$off('closePopup')
  }
}
</script>

<style lang="css" scoped>
.wrapper{
  width: 100%;
}
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
#controls{
  margin: 20px 0px;
  text-align: center;
}
.multiselect{
  display: inline-block;
  width: 25%;
  margin-right: 20px;
}
#datepicker{
  text-align: center;
  height: 20px;
  border-radius: 5px;
}
table{
  display: block;
  margin: auto;
	width: 600px;
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
#end{
	font-weight: bold;
}
#end th{
	font-weight: bold;
}
.total{
  font-weight: bold;
  text-align: right;
}
#add-button{
  color: #fff;
	background-color: #8D6E63;
  display: block;
  margin: 20px auto;
	height: 40px;
	border-radius: 10px;
	width:120px;
	font-size: 12px;
}
#add-button:hover{
  background-color: #D7CCC8;
  color: #8D6E63;
  border: 2px solid #8D6E63;
  cursor: pointer;
}
.number{
  font-size: 12px;
  color: rgb(112, 112, 112);
  text-align: right;
}
</style>
