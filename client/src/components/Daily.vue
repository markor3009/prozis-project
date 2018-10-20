<template lang="html">
  <div class="wrapper">
    <popup v-if="show" :items="itemsProps"></popup>
    <h1>Dnevni unos</h1>
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
    <table>
      <tr>
        <th class="title">Naziv proizvoda</th>
        <th>Kolicina</th>
        <th>Cena</th>
        <th>Iznos</th>
      </tr>
      <tr v-for="(p, index) in selected.prices" :key="p.pro_naziv">
        <td class="title"><label>{{p.pro_naziv}}</label></td>
        <td><input v-model="quantity[index]" @change="calculate"></td>
        <td class="number"><span>{{p.cen_cena}}</span></td>
        <td class="number"><span>{{quantity[index]*p.cen_cena}}</span></td>
      </tr>
      <tr class="total-row">
        <td>Total</td>
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
.multiselect{
  width: 50%;
  margin: 50px auto;
}
#datepicker{
  display: block;
  text-align: center;
  margin: 30px auto;
}
table{
  margin: auto;
  font-size: 14px;
  width: 40%;
  border-collapse: collapse;
}
table tr{
  border-bottom: 1px solid blue;
}
table td, th{
  padding: 5px;
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
.total{
  font-weight: bold;
  text-align: right;
}
#add-button{
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
#add-button:hover{
  background-color: rgb(188, 238, 153);
  color: black;
}
.number{
  font-size: 12px;
  color: rgb(112, 112, 112);
  text-align: right;
}
.title{
  width: 70%;
}
.total-row{
  font-weight: bold;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
}
</style>
