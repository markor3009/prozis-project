import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Daily from '@/components/Daily'
import Buyers from '@/components/Buyers'
import Invoices from '@/components/Invoices'
import Products from '@/components/Products'
import HelloWorld from '@/components/HelloWorld'
import InvOutput from '@/components/InvOutput'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/login',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/faktura',
      name: 'faktura',
      component: InvOutput
    }
  ]
})
