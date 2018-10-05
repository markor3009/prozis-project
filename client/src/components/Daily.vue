<template lang="html">
  <div class="wrapper">
    <popup v-if="popupType.show"
           :popupType="popupType"></popup>
    <h1>Dnevni unos</h1>
    <multiselect
      placeholder = "Izaberi Kupca"
      :options="buyers"
      label="kup_naziv"
      v-model="selected"
      class="multiselect"
      @input="reset"
     ></multiselect>
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
import Popup from '@/components/Popup'
import {bus} from '../main'
import {mapGetters} from 'vuex'
export default {
  name: 'Daily',
  data () {
    return {
      selected: {},
      quantity: [],
      total: 0,
      popupType: {
        show: false,
        title: 'POTVRDA PORUDZBINE',
        question: 'Da li ste sigurni da zelite da unesete porudzbinu?',
        message: 'Uspesno ste potvrdili porudzbinu!'
      }
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
      this.popupType.show = true
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
    'popup': Popup
  },
  computed: {
    ...mapGetters({
      'buyers': 'getBuyers'
    })
  },
  created () {
    bus.$on('closePopup', () => {
      this.popupType.show = false
    })
  },
  created() {
    this.selected = this.buyers[0]
    this.reset()
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
