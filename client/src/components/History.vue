<template lang="html">
  <div class="wrapper">
    <header>
      <h1><i class="fas fa-history"></i>ISTORIJA</h1>
    </header>
    <multiselect
     :options="buyers"
     label="kup_naziv"
     v-model="selected"
     @input="getHistory"
     ></multiselect>
     <table v-if="hasInvoices">
       <tr>
         <th>Broj fakture</th>
         <th>Datum izdavanja računa</th>
         <th>Iznos</th>
       </tr>
       <tr v-for="(inv, index) in history" :key="inv.fak_id">
         <td>{{inv.fak_broj}}</td>
         <td>{{inv.fak_do}}</td>
         <td>{{inv.fak_iznos | formatNumber}}</td>
         <td><span class="details" @click="details(index)">Detalji</span></td>
       </tr>
     </table>
     <section id="obavestenje" v-if="!hasInvoices">
      <h2>OVAJ KUPAC NEMA ZATVORENIH FAKTURA</h2>
    </section>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import {mapActions, mapGetters} from 'vuex'

export default {
  filters: {
    formatNumber (n) {
      if(n!== null){
        n = n.toString()
        if(n.indexOf('.')>0){
          var dot = n.indexOf('.')
          var newNum = n.substring(0,dot+3)
          return newNum.replace('.',',')
        }
        return n+',00'
      }
    return ''
    }
  },
  data(){
    return{
      selected: '',
      history: []
    }
  },
  methods: {
    ...mapActions({
        'fetchHistory': 'fetchHistory'
    }),
    getHistory(){
      this.fetchHistory(this.selected.kup_id).then((response) => {
        this.history = JSON.parse(JSON.stringify(response))
      })
    },
    details(index){
      var current = this.history[index]
      let routeData = this.$router.resolve({name: 'faktura', query: {fakId: current.fak_id, id: current.kup_id, number: current.fak_broj, date: current.fak_do, extDate: current.fak_placanje, traDate: current.fak_promet, total: current.fak_opis}});
      window.open(routeData.href, '_blank');
    }
  },
  computed: {
    ...mapGetters({
      'buyers': 'getBuyers'
    }),
    hasInvoices(){
      return this.history.length!==0
    }
  },
  components: {
    'multiselect': Multiselect
  },
  created(){
    this.selected = this.buyers[0]
    this.fetchHistory(this.buyers[0].kup_id).then((response) => {
      this.history = response
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
header i{
	color: white;
	margin-right: 10px;
}
.multiselect{
  width: 25%;
  margin: 50px auto;
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
.details:hover{
  cursor: pointer;
  text-decoration: underline;
}
#obavestenje{
  display: inline-block;
  width: 30%;
  height: 20%;
  text-align: center;
  vertical-align: middle;
	margin-left: 20%;
  outline: 1px solid #8D6E63;
  padding: 20px;
	background-color: #D7CCC8;
	color: #4E342E;
	border-radius: 10px;
	outline: none;
}
</style>
