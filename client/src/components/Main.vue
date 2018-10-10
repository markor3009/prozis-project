<template>
<div id="wrapper">
    <div id="side-menu">
      <ul>
        <li v-for="m in menus"
         :key="m.key"
         @click= "changeComp(m.key)"
         :class="{'active': m.key === selected}"
         >{{m.title}}</li>
      </ul>
    </div>
    <main-window/>
  </div>
</div>
</template>

<script>
import MainWindow from '@/components/MainWindow'
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
        {title: 'Proizvodi', key: 'Products'}
      ]
    }
  },

  methods: {
    changeComp (menu) {
      this.selected = menu
      bus.$emit('chosenMenu', menu)
    }
  },
  components: {
    'main-window': MainWindow
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#wrapper{
  height: 100vh;
}

h2 {
  font-weight: normal;
}

ul {
  margin-bottom: 0px;
  list-style-type: none;
  padding: 0;
}

li {
  text-align: left;
  font-size: 15px;
  margin: 10px 10px;
  cursor: pointer;
  text-transform: uppercase;
  padding: 5px;
  border-bottom: 0.5px solid silver;
}

li:hover, .active{
  background-color: rgb(188, 238, 153);
  color: black;
  opacity: 10%;
  border-radius: 5px;
}

a {
  color: #42b983;
}

#side-menu{
  width: 20%;
  height: 100%;
  background-color: rgb(76, 65, 93);
  color: white;
  float: left;
}
</style>
