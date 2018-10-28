import api from '../api/index.js'

export default {
  register: ()=>{
    return api.register().then((re)=>{
      return re;
    })
  },
  fetchPrices: ({commit}, params) => {
    return api.fetchPrices(params).then((response) => {
      var p = {
        prices: response.data,
        id: params
      }
      commit('STORE_PRICES', p)
    })
  },
  fetchBuyers: ({commit, dispatch}) => {
    return api.fetchBuyers().then((response) => {
      commit('STORE_BUYERS',response.data)
      for (var i = 0; i < response.data.length; i++) {
        dispatch('fetchPrices',response.data[i].kup_id)
      }
    })
  },
  addBuyer: ({commit, dispatch}, params) => {
    return api.addBuyer(params).then((response) => {
      if (response.data == 'OK') {
        return Promise.resolve()
      }else{
        return Promise.reject()
      }
    })
  },
  updateBuyers: ({commit, dispatch}, params) => {
    return api.updateBuyers(params).then((response) => {
      if (response.data == 'OK') {
          return Promise.resolve();
      }else{
        return Promise.reject()
      }
    })
  },
  addItems: ({commit}, params) => {
    return api.addItems(params).then((response) => {
      if(response.data == 'OK'){
        return Promise.resolve();
      }else{
        return Promise.reject();
      }
    })
  },
  deleteItem: ({commit}, params) => {
    return api.deleteItem(params).then((response) => {
      if(response.data == 'OK'){
        return Promise.resolve();
      }else{
        return Promise.reject();
      }
    })
  },
  fetchProducts: ({commit}) => {
    return api.fetchProducts().then((response) => {
      commit('STORE_PRODUCTS', response.data)
    })
  },
  updateProducts: ({commit}, params) => {
    return api.updateProducts(params).then((response) => {
      if(response.data == 'OK'){
        return Promise.resolve();
      }else{
        return Promise.reject();
      }
    })
  },
  addInvoice: ({commit, dispatch}, params) => {
    return api.addInvoice({id:params}).then((response) => {
      if(response.data == 'OK'){
        return Promise.resolve()
      }else{
        return Promise.reject()
      }
    })
  },
  closeInvoice: ({commit}, params) => {
    return api.closeInvoice(params).then((response) =>{
      if(response.data == 'OK'){
        return Promise.resolve()
      }else{
        return Promise.reject()
      }
    })
  },
  fetchInvoice: ({commit}, params) => {
    return api.fetchInvoice({id: params}).then((response)=> {
      return response.data;
    })
  }
}
