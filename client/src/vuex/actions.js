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
    console.log('bb');
    return api.fetchBuyers().then((response) => {
      commit('STORE_BUYERS',response.data)
      for (var i = 0; i < response.data.length; i++) {
        dispatch('fetchPrices',response.data[i].kup_id)
      }
    })
  },
  addItems: ({commit}, params) => {
    return api.addItems(params).then((response) => {
      if(response.data == 'OK'){
        console.log('ok');
        return Promise.resolve();
      }else{
        return Promise.reject();
      }
    })
  }
}
