<template lang="html">
<div>
  <div id="wrapper">
  	<div id="zaglavlje">
  		<h1>PRO ZIS TIM D.O.O.<br>
  		 	11080 Z E M U N<br>
  		 	Železnička 28
  		</h1>
  	</div>

  	<div id="float">
  	<div id="racun">
  		<h2>RAČUN br:{{invNumber}}</h2>
  		<div id="podaci">
  			<p>
  				<ul>
  					<li>Datum izdavanja računa: {{invDate}}</li>
  					<li>Mesto izdavanja računa: Beograd- Zemun</li>
  					<li>Valuta plaćanja računa: {{invExtDate}}</li>
  					<li>Datum prometa dobara i usluga: {{invTraDate}}</li>
  				</ul>
  			</p>
  		</div><!--kraj podaci-->
  	</div><!--kraj racuna-->

  	<div id="kupac">
  		<p>{{buyer.kup_naziv}}<br>
  		{{buyer.kup_adresa}}<br>
  		{{buyer.kup_pozbr}} {{buyer.kup_mesto}}<br>
  		PIB: {{buyer.kup_pib}}</p>
  	</div><!--kraj kupac-->
  	</div><!--kraj float-->


  	<div id="tabela">
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
  				<td>0.00</td>
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
  				<td colspan="2">{{total * 0.1 | formatNumber}}</td>
  			</tr>
  			<tr>
  				<td class="mali">10%</td>
  				<td class="mali" colspan="2">{{total | formatNumber}}</td>
  				<td class="mali">{{total * 0.1 | formatNumber}}</td>
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
  	</div><!--kraj tabele-->

  	<p>Slovima: {{totalWords}}</p>

  	<div id="dodatak">
  		<p>Napomena o poreskom oslobađanju: NEMA<br>
  		U slučaju spora nadležan je Privredni sud u Beogardu<br>
  		U slučaju prekoračenja roka za plaćanje obračunavamo zakonom propisanu zateznu kamatu</p>
  	</div><!--kraj dodatka-->

  	<div id="footer">

  		<div id="levi">
  			<ul>
  				<li>Robu primio</li>
  				<li><hr></li>
  				<li><hr></li>
  			</ul>
  		</div><!--levi-->

  		<div id="desni">

  				<ul>
  					<li>Ercegovčević Slaviša</li>
  					<li><hr></li>
  					<li><hr></li>
  					<li>Zemun Železnička 28</li>
  					<li>JMBG 2605976710149</li>
  			    </ul>
  		</div><!--desni-->
  	</div><!--footer-->

  	<div id="pib">
  		<p>PIB 107755595 M.B. 20865512 Šifra del. 1071 T-R 125-1797813-54 Piraeus banka</p>
  	</div>

  </div><!--kraj wrapper-->
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {bus} from '../main'
export default {
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
  data() {
    return{
      items: []
    }
  },
  methods: {
    ...mapActions({
      'fetchInvoice': 'fetchInvoice'
    }),
    sum (p) {
      return p.stk_cena * p.stk_kolicina
    }
  },
  computed: {
    ...mapGetters({
      'buyers': 'getBuyers'
    })
    ,
    total () {
      var t = 0
      for (var i = 0; i < this.invoice.length; i++) {
        t += this.sum(this.invoice[i])
      }
      return t
    },
    invNumber(){
      return this.$route.query.number;
    },
    invDate(){
      return this.$route.query.date;
    },
    invExtDate(){
      return this.$route.query.extDate;
    },
    invTraDate(){
      return this.$route.query.traDate;
    },
    totalWords(){
      return this.$route.query.total;
    },
    buyer() {
      var b = {}
      for (var i = 0; i < this.buyers.length; i++) {
        if(this.buyers[i].kup_id == this.$route.query.id){
          b = JSON.parse(JSON.stringify(this.buyers[i]))
        }
      }
      return b
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
  created(){
    var fakId = this.$route.query.fakId
    var buyerID = this.$route.query.id
    var params = {
      inv: '',
      id: ''
    }
    if (fakId) {
      params.inv = fakId
    }
    params.id = buyerID
    this.fetchInvoice(params).then((items) => {
      this.items = JSON.parse(JSON.stringify(items));
    })

  }
}
</script>

<style lang="css" scoped>
#wrapper{
	width: 100%;
	margin: 0 auto;
	background-color: white;
	padding: 20px
}
#zaglavlje{
	margin-left: 5%;
	color: #06118A;
}
#podaci{
	font-family: Arial;
}
#float{
	width:98%;
	padding: 15px;
	overflow: hidden;
	margin-bottom: 20px;
}

table{
	border-collapse: collapse;
	width: 98%;
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
  margin-right: 10%;
	padding: 15px;
	border:solid 2px;
	font-weight: 400;
}
#kupac::children{
  float: left;
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

</style>
