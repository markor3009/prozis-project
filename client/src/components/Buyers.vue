<template lang="html">
  <div class="wrapper">
    <h1>Kupci</h1>
    <div id="select-menu"><multiselect :options="buyers" label="kup_naziv" v-model="selected" @input="reset"></multiselect>
    <span @click="addNew">+DODAJ NOVOG KUPCA</span></div>
    <ul id="basic-info">
      <li><h3>Osnovne informacije</h3></li>
      <li><label>Ime Prezime: </label><input type="text" v-model="selected.kup_naziv"></li>
      <li><label>Adresa: </label><input type="text" v-model="selected.kup_adresa"></li>
      <li><label>PIB: </label><input type="text" v-model="selected.kup_pib"></li>
    </ul>
    <table>
      <tr>
        <th>Ime proizvoda</th>
        <th>Cena proizvoda</th>
      </tr>
      <tr v-for="p in selected.prices" :key="p.pro_id">
        <td>{{p.pro_naziv}}</td>
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
      'updateBuyers': 'updateBuyers'
    }),
    addNew () {
      var buyer = {kup_naziv: '',
        kup_adresa: '',
        kup_ppib: '',
        products: [
          {name: 'Somun veliki', price: 50},
          {name: 'Somun mali', price: 50},
          {name: 'Lepinja velika', price: 50},
          {name: 'Lepinja mala', price: 50},
          {name: 'Kifla', price: 50},
          {name: 'Pogacica', price: 15},
          {name: 'Pap. veliki', price: 50},
          {name: 'Pap. mali', price: 50},
          {name: 'Sis', price: 50}]}
      this.selected = buyer
    },
    save () {
      if(this.selected.kup_pib != '' && this.selected.kup_naziv != '' && this.selected.kup_adresa != ''){
        var empty = 0
        for (var i = 0; i < this.selected.prices.length; i++) {
          if(this.selected.prices[i].cen_cena !== '' && this.selected.prices[i].cen_cena !== '0'){
            empty++;
          }
        }
        if(empty == 0){
          alert("Unesite cenu za bar jedan prozivod.")
        }else{
          this.updateBuyers(this.selected).then(() => {
              alert('IZMENE SACUVANE');
              this.buyers = JSON.parse(JSON.stringify(this.buyersSource))
          }).catch(() => {
            alert('krenulo po zlu')
          })
        }
      }else{
      alert("Sva polja su obavezna. Unesite sve informacije o kupcu.")
      }
    },
    reset(){
      var id = this.selected.kup_id
      for (var i = 0; i < this.buyersSource.length; i++) {
        if(id == this.buyersSource[i].kup_id){
          this.selected = JSON.parse(JSON.stringify(this.buyersSource[i]))
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      'buyersSource': 'getBuyers'
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
  }
}
</script>

<style lang="css" scoped>
#basic-info{
  padding: 20px;
  margin-left: 10%;
  float: left;
  display: inline-block;
  list-style: none;
  border: 1px solid  rgb(76, 65, 93);
}
#basic-info h3{
  text-align: center;
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
.multiselect{
  width: 30%;
  display: inline-block;
  margin: 50px 0px;
  margin-left: 30%;
}
#select-menu span{
  display: inline-block;
  margin-left: 20px;
  padding: 5px;
  font-size: 14px;
  background-color: rgb(181, 200, 185);
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
}
#select-menu span:hover{
  background-color: rgb(188, 238, 153);
  color: black;
}
table{
  margin: auto;
  font-size: 14px;
  width: 40%;
  padding: 15px;
  border-collapse: collapse;
  border: 1px solid  rgb(76, 65, 93);
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
.buttons button{
  display: inline-block;
  margin: 50px 40px;
  font-size: 14px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: rgb(76, 65, 93);
  color: white;
  cursor: pointer;
}
.buttons button:hover{
  background-color: rgb(188, 238, 153);
  color: black;
}
</style>
