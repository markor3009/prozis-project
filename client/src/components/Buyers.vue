<template lang="html">
  <div class="wrapper">
    <h1>Kupci</h1>
    <div id="select-menu"><multiselect :options="buyers" label="name" :value="selected.name" v-model="selected"></multiselect>
    <span @click="addNew">+DODAJ NOVOG KUPCA</span></div>
    <ul id="basic-info">
      <li><h3>Osnovne informacije</h3></li>
      <li><label>Ime Prezime: </label><input type="text" v-model="selected.name"></li>
      <li><label>Adresa: </label><input type="text" v-model="selected.adress"></li>
      <li><label>PIB: </label><input type="text" v-model="selected.pib"></li>
    </ul>
    <table>
      <tr>
        <th>Ime proizvoda</th>
        <th>Cena proizvoda</th>
      </tr>
      <tr v-for="p in selected.products" :key="p.name">
        <td>{{p.name}}</td>
        <td><input v-model="p.price"></td>
      </tr>
    </table>
    <button id="save-button" @click="save">Sacuvaj</button>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import {mapGetters} from 'vuex'
export default {
  name: 'Buyers',
  data () {
    return {
      buyers: [
        {name: 'PONCHO PLUS JEDAN UR Marko Mlađan PR',
          adress: 'Bulevar Zorana Đinđića 44 A',
          pib: '107481002',
          products: [
            {name: 'Somun veliki', price: 50},
            {name: 'Somun mali', price: 30},
            {name: 'Lepinja velika', price: 40},
            {name: 'Lepinja mala', price: 20},
            {name: 'Kifla', price: 10},
            {name: 'Pogacica', price: 14},
            {name: 'Pap. veliki', price: 50},
            {name: 'Pap. mali', price: 40},
            {name: 'Sis', price: 30}
          ]},
        {name: 'Marija Ercegovcevic',
          adress: 'Zeleznicka 28',
          pib: 'DSA564312',
          products: [
            {name: 'Somun veliki', price: 40},
            {name: 'Somun mali', price: 20},
            {name: 'Lepinja velika', price: 30},
            {name: 'Lepinja mala', price: 30},
            {name: 'Kifla', price: 12},
            {name: 'Pogacica', price: 14},
            {name: 'Pap. veliki', price: 50},
            {name: 'Pap. mali', price: 30},
            {name: 'Sis', price: 30}
          ]},
        {name: 'Petar Stojanovic',
          adress: 'Krnjaca BB',
          pib: 'ABCDEFG654',
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
      ],
      selected: null
    }
  },
  methods: {
    addNew () {
      var buyer = {name: '',
        adress: '',
        pib: '',
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
      var b = this.selected
      if (b.name !== '' && b.adress !== '' && b.pib !== '') {
        this.buyers.push(b)
        alert('Kupac ' + b.name + ' je sacuvan!')
      } else {
        alert('Sva polja su obavezna!')
      }
    }
  },
  components: {
    'multiselect': Multiselect
  },
  created () {
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
#save-button{
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
#save-button:hover{
  background-color: rgb(188, 238, 153);
  color: black;
}
</style>
