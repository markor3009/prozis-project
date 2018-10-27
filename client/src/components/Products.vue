<template lang="html">
  <div class="wrapper">
    <header>
      <h1><img src="../assets/bread.png"></i>PROIZVODI</h1>
    </header>
    <span id="add-new">DODAJ NOVI PROIZVOD</span>
    <table>
      <tr>
        <th>Ime proizvoda</th>
        <th>Standardna cena proizvoda</th>
      </tr>
      <tr v-for="p in products" :key="p.pro_id">
        <td class="firstTD">{{p.pro_naziv}}</td>
        <td><input type="number" v-model="p.cen_cena"></td>
        <td class="remove-product"><span title="Izbriši proizvod" @click="deleteProduct(p.pro_id)">X</span></td>
      </tr>
    </table>
    <div class="buttons" v-if="changed">
      <button id="save-button" @click="save">Sacuvaj izmene</button>
      <button id="reset-button" @click="reset">Odbaci izmene</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'Daily',
  data(){
    return{
      products:''
    }
  },
  methods: {
    ...mapActions({
      'fetchProducts': 'fetchProducts',
      'updateProducts': 'updateProducts'
    }),
    deleteProduct(proId){

    },
    save(){
      this.updateProducts(this.products).then(() => {
          alert('Izmene sačuvane!')
      }).catch(() => {
        alert('Nesto ne valja')
      })
    },
    reset(){
      this.products = JSON.parse(JSON.stringify(this.productsSource))
    }
  },
  computed: {
    ...mapGetters({
      'productsSource': 'getProducts'
    }),
    changed(){
      if(JSON.stringify(this.products) === JSON.stringify(this.productsSource)){
        return false;
      } else{
        return true;
      }
    }
  },
  created(){
    this.fetchProducts().then(() =>{
      this.products = JSON.parse(JSON.stringify(this.productsSource))
    })
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
img{
	height: 25px;
	margin-right: 10px;
  vertical-align: middle;
}
#add-new {
  float: right;
  margin-top: 3%;
  margin-right: 10%;
  padding: 10px;
  font-size: 14px;
  background-color: #D7CCC8;
	font-weight: bold;
	color: #4E342E;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
}
#add-new:hover{
  background-color: #B49F98;
	color: #fff;
	border: none;
}
table{
  display: block;
  margin: 20px auto;
  font-size: 14px;
  width: 30%;
  text-align: left;
	border-bottom: 1px solid #4E342E;
	font-size: 14px;
}
table tr th{
	padding: 5px;
	margin-left: 20px;
}
.firstTD{
	text-align:left;
	font-weight: normal;
  width: 60%;
}
.remove-product{
  text-align: center;
  width: 10%;
}
.remove-product span{
  font-size: 10px;
  font-weight: bold;
  display: inline-block;
  width: 10px;
  cursor: pointer;
  border: 1px solid #4E342E;
  padding: 5px;
  border-radius: 25px;
}
.remove-product span:hover{
  background-color: rgb(237, 186, 186);

}
table tr td{
	padding: 5px;
  width: 5%;
}
table tr:nth-of-type(2n){
	background-color: #D7CCC8;
}
table tr:nth-of-type(2n-1) input{
	border: 1px solid rgb(161, 144, 117);
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
  width:20%;
  margin: auto;
}
.buttons button{
  display: inline-block;
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
