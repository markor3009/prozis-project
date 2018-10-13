<template lang="html">
  <div class="wrapper">
    <export-popup v-if="exportVisible" :buyer="selected"></export-popup>
    <h1>Fakture</h1>
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
    <div v-if="!hasItems">
      "OVAJ KUPAC NEMA STAVKE U FAKTURI"
    </div>
    <button type="button" id="add-button" name="button" @click="exportInvoice" v-if="hasItems">Izdaj Fakturu</button>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import {mapActions, mapGetters} from 'vuex'
import ExportInvoice from './ExportInvoice'
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
      exportVisible: false
    }
  },
  methods: {
    ...mapActions({
      'fetchInvoice': 'fetchInvoice'
    }),
    getInvoice(){
      this.fetchInvoice(this.selected.kup_id).then((invoice) =>{
        this.items = invoice
      })
    },
    sum (p) {
      return p.stk_cena * p.stk_kolicina
    },
    exportInvoice () {
      this.exportVisible = true
      bus.$emit('exportInv', this.invoice)
    }
  },
  components: {
    'multiselect': Multiselect,
    'export-popup': ExportInvoice
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
      console.log(this.items.length);
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
      console.log(inv.length);
      return inv
    }
  },
  created () {
    this.selected = this.buyers[0]
    this.fetchInvoice(this.selected.kup_id).then((items) => {
      this.items = items
      console.log(items);
    })
    bus.$on('closeExport', () => {
      this.exportVisible = false
    })
  }
}
</script>

<style lang="css" scoped>
*{
  font-size: 14px;
}
.multiselect{
  width: 50%;
  margin: 50px auto;
}
table{
	border-collapse: collapse;
	width: 100%;
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
</style>
