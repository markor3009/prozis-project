import api from '../api/index.js'

export default {
  register: ()=>{
    return api.register().then((re)=>{
      return re;
    })
  },
  fetchBuyers: ({commit}) => {
    return api.fetchBuyers().then((response) => {
      commit('STORE_BUYERS',response.data)
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
  }
}
