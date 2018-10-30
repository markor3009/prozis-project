<template lang="html">
  <div class="wrapper">
    <export-popup v-if="exportVisible" :invProps="invProps"></export-popup>
    <details-popup v-if="detailsVisible" :items="items" :buyer="selected.kup_id"></details-popup>
    <header>
      <h1><i class="fas fa-file-invoice"></i>FAKTURA</h1>
    </header>
    <multiselect
     :options="buyers"
     label="kup_naziv"
     v-model="selected"
    @input="getInvoice"
     ></multiselect>
      <div id="tabela" v-if="hasItems">
  		<table>
  			<tr>
  				<th>R.br</th>
  				<th>Naziv</th>
  				<th>JM</th>
  				<th>Količina</th>
  				<th>Jedinična cena</th>
  				<th>Rabat%</th>
  				<th>PDV%</th>
  				<th>Osnovica za PDV</th>
  				<th>PDV</th>
  				<th>Iznos sa PDV-om</th>
  			</tr>
  			<tr v-for="(p,index) in invoice">
  				<td>{{index+1}}.</td>
  				<th>{{p.pro_naziv}}</th>
  				<td>kom.</td>
  				<td>{{p.stk_kolicina}}</td>
  				<td>{{p.stk_cena}}</td>
  				<td>0,00</td>
  				<td>10,00</td>
  				<td>{{sum(p) | formatNumber}}</td>
  				<td>{{sum(p)*.1 | formatNumber}}</td>
  				<td>{{sum(p)*1.1 | formatNumber}}</td>
  			</tr>
  			<tr>
  				<td colspan="10">&nbsp;</td>
  			</tr>
  			<tr>
  				<td colspan="8"><strong>Vrednost bez PDV-a:</strong></td>
  				<td colspan="3">{{total | formatNumber}}</td>
  			</tr>
  			<tr>
  				<td colspan="4" id="mali">Rekapitulacija po poreskim stopama</td>
  				<td colspan="4"><strong>Iznos PDV-a</strong></td>
          <td colspan="2">{{total*.1 | formatNumber}}</td>
  			</tr>
  			<tr>
  				<td class="mali">10%</td>
  				<td class="mali" colspan="2">{{total | formatNumber}}</td>
  				<td class="mali">{{total*.1 | formatNumber}}</td>
  				<td class="mali" colspan="2">{{total*1.1 | formatNumber}}</td>
  				<td colspan="2"><strong>UKUPNO SA PDV-om:</strong></td>
  				<td colspan="2"><strong>{{total*1.1 | formatNumber}}</strong></td>
  			</tr>
  			<tr>
  				<td colspan="7" id="avans">Avansna uplata</td>
  				<td colspan="3">0,00</td>
  			</tr>
  			<tr>
  				<td colspan="8"><strong>ZA UPLATU (sa PDV-om):</strong></td>
  				<td colspan="2"><strong>{{total*1.1 | formatNumber}}</strong></td>
  			</tr>
  		</table>
  	</div>
    <section id="obavestenje" v-if="!hasItems">
  		<h2>OVAJ KUPAC NEMA STAVKE U FAKTURI</h2>
  	</section>
    <div id="button-div" v-if="hasItems">
        <button type="button" class="add-button" name="button" @click="exportInvoice">Izdaj Fakturu</button>
        <button type="button" class="add-button" name="button" @click="openDetails">Otvori detalje</button>
    </div>

  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import {mapActions, mapGetters} from 'vuex'
import ExportInvoice from './popups/ExportInvoice'
import DetailsInvoice from './popups/DetailsInvoice'
import {bus} from '../main'
export default {
  name: 'Invoices',
  filters: {
    formatNumber (n) {
      n = n.toString()
      if(n.indexOf('.')>0){
        var dot = n.indexOf('.')
        var newNum = n.substring(0,dot+3)
        return newNum.replace('.',',')
      }
      return n+',00'
    }
  },
  data () {
    return {
      items: '',
      exportVisible: false,
      detailsVisible: false,
      selected: '',
      invProps:''
    }
  },
  methods: {
    ...mapActions({
      'fetchInvoice': 'fetchInvoice'
    }),
    getInvoice(){
      var params = {
        id: this.selected.kup_id,
        inv: ''
      }
      this.fetchInvoice(params).then((invoice) =>{
        this.items = invoice
      })
    },
    sum (p) {
      return p.stk_cena * p.stk_kolicina
    },
    exportInvoice () {
      this.invProps = {
        invoice: this.invoice,
        total: this.total*1.1,
        buyer: this.selected.kup_id
      }
      this.exportVisible = true
    },
    openDetails () {
      this.detailsVisible = true;
    },
    refresh(){
      this.selected = this.buyers[0]
      this.fetchInvoice(this.selected.kup_id).then((items) => {
        this.items = items
      })
    }
  },
  components: {
    'multiselect': Multiselect,
    'export-popup': ExportInvoice,
    'details-popup': DetailsInvoice
  },
  computed: {
    ...mapGetters({
      'buyers': 'getBuyers'
    }),
    total () {
      var t = 0
      for (var i = 0; i < this.invoice.length; i++) {
        t += this.sum(this.invoice[i])
      }
      return t
    },
    hasItems() {
      if(this.items.length !== 0)
        return true;
      return false;
    },
    invoice(){
      var inv = []
      var n = 0
      inv.push(this.items[0])
      for (var i = 1; i < this.items.length; i++) {
        for (var j = 0; j < inv.length; j++) {
          if(this.items[i].pro_id == inv[j].pro_id){
            inv[j].stk_kolicina += this.items[i].stk_kolicina
            n++;
            break;
          }
        }
        if(n == 0){
          inv.push(this.items[i])
        }else{
          n=0
        }
      }
      return inv
    }
  },
  created () {
    this.refresh()
    bus.$on('closeExport', () => {
      this.exportVisible = false;
    })
    bus.$on('closeDetails', () => {
      this.detailsVisible = false;
    })
    bus.$on('closedInvoice', () =>{
      this.refresh();
      this.exportVisible = false;
    })
    bus.$on('deletedItem', (kupId) =>{
      this.fetchInvoice(kupId).then((items) => {
        this.items = items
      })
    })
  }
}
</script>

<style lang="css" scoped>
*{
  font-size: 14px;
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
.multiselect{
  width: 25%;
  margin: 50px auto;
}
table{
  margin: auto;
	border-collapse: collapse;
	width: 70%;
}

th, td {
    padding: 5px;
    text-align: right;
    border-bottom: 1px solid #ddd;
}
th{
	text-align: left;
}
#mali{
	font-size:70%;
	text-align: left;
}
.mali{
	font-size:70%;
	text-align: center;
}
#avans{
	font-size:70%;
	text-align: right;
}


#podaci{
	text-align: left;
}
ul{
	padding: 0;
	margin: 0;
	list-style-type: none;
}
#racun{
	float:left;
}
#kupac{
	float:right;
	padding: 15px;
	border:solid 2px;
	font-weight: bold;
}
#dodatak{
	margin-top: 30px;
	text-align: left;
	margin-bottom: 40px;
}
#footer{
	overflow: hidden;
	border-bottom: dotted 2px;
	padding-bottom: 60px;
	color: #06118A;
}
#levi{
	float: left;
	margin-left: 10%;
}

#desni{
	float: right;
	margin-right: 10%;
}
ul hr{
	margin-top: 15px;
}
#pib{
	text-align: center;
	color: #06118A;
}
#button-div{
  text-align: center;
  margin-top: 50px;
}
.add-button{
  font-size: 14px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: #8D6E63;
  color: #fff;
  cursor: pointer;
}
.add-button:hover{
  background-color: #D7CCC8;
  color: #8D6E63;
  border: 1px solid #8D6E63;
  cursor: pointer;
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
