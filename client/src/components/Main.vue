<template>
<div id="wrapper">
    <aside>
    <nav>
      <ul>
        <li @click="changeComp('Daily')" :class="{'active': selected === 'Daily'}"><i class="far fa-calendar-check"></i>Dnevni unos</li>
        <li @click="changeComp('Buyers')" :class="{'active': selected === 'Buyers'}"><i class="far fa-user"></i>Kupci</li>
        <li @click="changeComp('Invoices')" :class="{'active': selected === 'Invoices'}"><i class="fas fa-file-invoice"></i>Faktura</li>
        <li @click="changeComp('Products')" :class="{'active': selected === 'Products'}"><img src="../assets/bread.png">Proizvodi</li>
        <li @click="changeComp('History')" :class="{'active': selected === 'History'}"><i class="fas fa-history"></i>Istorija</li>
      </ul>
    </nav>
    </aside><!--kraj aside navigacije-->
    <main-window/>
  </div>
</div>
</template>

<script>
import MainWindow from '@/components/MainWindow'
import {mapActions} from 'vuex'
import {bus} from '../main'
export default {
  name: 'Main',
  data () {
    return {
      name: 'Marko',
      selected: 'Daily',
      menus: [
        {title: 'Dnevni unos', key: 'Daily'},
        {title: 'Kupci', key: 'Buyers'},
        {title: 'Fakture', key: 'Invoices'},
        {title: 'Proizvodi', key: 'Products'},
        {title: 'Istorija', key: 'History'}
      ]
    }
  },

  methods: {
    ...mapActions({
      'fetchBuyers': 'fetchBuyers',
      'fetchProducts': 'fetchProducts'
    }),
    changeComp (menu) {
      this.selected = menu
      bus.$emit('chosenMenu', menu)
    }
  },
  components: {
    'main-window': MainWindow
  },
  created() {
    this.fetchBuyers().catch(() => {
      this.$router.push('/login')
    })
    this.fetchProducts()

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#wrapper{
  height: 100vh;
  margin: 0px;
}

aside{
	background-color: #EFEBE9;
	width: 200px;
	height: 100%;
	float: left;
}

aside i{
	color:#8D6E63;
	margin-right: 10px;
	font-size: 25px;
}
nav{
	margin-top: 50px;
}
nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 200px;
    background-color:#EFEBE9;
}
nav ul li,
nav ul li:visited{
  display: block;
  color: #4E342E;
  padding: 10px 0;
  text-decoration: none;
	height: 30px;
	line-height: 30px;
	text-align: center;
	font-weight: bold;
	border: 1px solid #8D6E63;
	background-color: #EFEBE9;

}
nav ul li:hover{
	display: block;
  color: #4E342E;
  padding: 10px 0;
  text-decoration: none;
	height: 30px;
	line-height: 30px;
	text-align: center;
	font-weight: bold;
	border: 1px solid #8D6E63;
	background-color: #D7CCC8;
  cursor: pointer;
}

.active{
	display: block;
  color: #4E342E;
  padding: 10px 0;
  text-decoration: none;
	height: 30px;
	line-height: 30px;
	text-align: center;
	font-weight: bold;
	border: 2px solid #8D6E63;
	background-color: #D7CCC8;
	border-radius: 15px;
}
img{
	height: 25px;
	margin-right: 10px;
	line-height:52px;
	vertical-align:bottom;

}
</style>
