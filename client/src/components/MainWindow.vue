<template lang="html">
  <div class="wrapper">
    <component :is="component"></component>
  </div>
</template>

<script>
import {bus} from '../main'
import {mapActions, mapGetters} from 'vuex'
import Daily from '@/components/Daily'
import Buyers from '@/components/Buyers'
import Invoices from '@/components/Invoices'
import Products from '@/components/Products'
export default {
  data () {
    return {
      component: 'Daily'
    }
  },
  components: {
    'Daily': Daily,
    'Buyers': Buyers,
    'Invoices': Invoices,
    'Products': Products
  },
  methods: {
    ...mapActions({
      'fetchBuyers': 'fetchBuyers',
      'fetchPrices': 'fetchPrices'
    })
  },
  mounted(){
    this.fetchBuyers().then(()=>{
      for(var i = 0; i < this.buyers.length; i++){
        this.fetchPrices(this.buyers[i].kup_id)
      }
    })
  },
  created () {
    bus.$on('chosenMenu', menu => {
      this.component = menu
    })
  },
  computed: {
    ...mapGetters({
      'buyers': 'getBuyers'
    })
  },
  beforeDestroy () {
    bus.$off('chosenMenu')
  }
}
</script>

<style lang="css">
  h1{
    margin: 10px;
    text-align: center;
  }
  .wrapper{
    padding: 0px;
    width: 80%;
    float: left;
    height: 100%;
    background-color: rgb(245, 245, 245)
  }
</style>
