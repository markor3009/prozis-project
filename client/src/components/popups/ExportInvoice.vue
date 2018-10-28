<template lang="html">
  <div class="wrapper">
    <div class="content">
      <span id="close" @click="closePopup">X</span>
      <div class="title">
        <span>{{buyer.kup_naziv}}</span>
      </div>
      <table class="invForm">
        <tr>
          <td>Broj fakture:</td>
          <td><input type="text" v-model="invNumber" :disabled="disabledFields"/></td>
        </tr>
        <tr>
          <td>Datum izdavanja robe:</td>
          <td><input type="date" v-model="invDate" :disabled="disabledFields"/></td>
        </tr>
        <tr>
          <td>Valuta placanja fakture:</td>
          <td><input type="date" v-model="invExtDate" :disabled="disabledFields"/></td>
        </tr>
        <tr>
          <td>Datum prometa dobara i usluga:</td>
          <td><input type="date" v-model="invTraDate" :disabled="disabledFields"/></td>
        </tr>
        <tr>
          <td>Unesi slovima ({{total | formatNumber}}) :</td>
          <td><input type="text" v-model="totalWords" :disabled="disabledFields"/></td>
        </tr>
      </table>
      <div class="footer">
        <button type="button" class="out-button" @click="exportInv" v-if="!clicked">Izdaj fakturu</button>
        <button type="button" class="out-button" @click="closeInvoice" v-if="clicked">Zatvori fakturu</button>
        <button type="button" class="out-button" @click="closePopup" v-if="clicked">Odustani</button>
        <span id="message" v-if="showMessage">
          {{message}}
        </span>
      </div>
    </div>
  </div>

</template>

<script>
import {bus} from '../../main'
import {mapActions, mapGetters} from 'vuex'
export default {
  props:['invProps'],
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
      invNumber: '',
      invDate: '',
      invExtDate: '',
      invTraDate: '',
      totalWords: '',
      message : 'Sva polja su obavezna!',
      showMessage: false,
      clicked: false,
      disabledFields: false
    }
  },
  methods: {
    ...mapActions({
      'closeInvoiceAction': 'closeInvoice'
    }),
    closePopup () {
      bus.$emit('closeExport')
    },
    closeInvoice(){
      var invoice = {
        invoiceID: this.inv[0].fak_id,
        invoiceNumber: this.invNumber,
        invoiceDate: this.invExtDate,
        invoiceTraffic: this.invTraDate,
        invoiceTotal: this.invProps.total,
        buyerID: this.buyer.kup_id
      }
      this.closeInvoiceAction(invoice).then(() => {
        bus.$emit('closedInvoice')
      });
    },
    exportInv () {
      if(this.invNumber!=='' && this.invDate !== '' && this.invExtDate !== ''){
        this.showMessage = false;
        this.clicked = true;
        this.disabledFields = true;
        let routeData = this.$router.resolve({name: 'faktura', query: {id: this.buyer.kup_id, number: this.invNumber, date: this.invDate, extDate: this.invExtDate, traDate: this.invTraDate, total: this.totalWords}});
        window.open(routeData.href, '_blank');
      }else{
        this.showMessage = true
      }
    }
  },
  computed : {
    ...mapGetters({
      'buyers': 'getBuyers'
    }),
    buyer(){
      for (var i = 0; i < this.buyers.length; i++) {
        if(this.buyers[i].kup_id == this.invProps.buyer){
          return this.buyers[i]
        }
      }
    },
    inv(){
      return this.invProps.invoice
    },
    total(){
      return this.invProps.total
    }

  }
}
</script>

<style lang="css" scoped>
.wrapper{
  position: fixed;
  top:0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
  z-index: 10000;
}
#close-button{
  color: rgb(170, 170, 170);
  font-size: 50px;
  display: inline-block;
  text-align: center;
  padding: 10px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  float: right;
  margin-top: 10px;
  margin-right: 15px;
}
.content{
  position: absolute;
  background-color: white;
  display: inline-block;
  width: 40%;
  height: 50%;
  margin: auto;
  top: 25%;
  left: 30%;
}
#close{
  position: relative;
  top: -20px;
  float: right;
  right: -15px;
  font-size: 15px;
  border: 1px solid rgb(76, 65, 93);
  border-radius: 25px;
  padding: 5px;
  width: 20px;
  height: 20px;
  text-align: center;
  vertical-align: middle;
  background-color: white;
  color: rgb(76, 65, 93);
  background-color: #8D6E63;
  color: #fff;
  border: 1px solid white;
}
#close:hover{
  background-color: white;
  color: rgb(76, 65, 93);
  border: 1px solid rgb(76, 65, 93);
  cursor: pointer;
}
.title{
  width: 100%;
  background-color: silver;
  font-size: 20px;
  text-align: center;
  vertical-align: middle;
}
.title span{
  display: inline-block;
  color: #4E342E;
  height: 100%;
  margin-top: 10px;
  margin-bottom: 5px;
}
.invForm{
  width: 70%;
  margin-top: 5%;
  margin-left: 20%;
  border: none;
  border-collapse:collapse;
}
.invForm tr{
  height: 50px;
}
.invForm tr button{
  margin: auto;
}
.footer {
  text-align: center;
}
.out-button{
  margin: 20px auto;
  font-size: 14px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: #8D6E63;
  color: #fff;
  cursor: pointer;
}
.out-button:hover{
  background-color: #D7CCC8;
  color: #8D6E63;
  border: 1px solid #8D6E63;
  cursor: pointer;
}
#message {
  display: inline-block;
  width: 100%;
  text-align: center;
  color: red;
}
</style>
