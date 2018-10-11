import {default as axios} from './config.js'

export default {
  register: () =>{
    return axios.get('register');
  },
  fetchBuyers: () => {
    return axios.get('buyers')
  },
  updateBuyers: (params) => {
    return axios({
      url: 'buyers',
      method: 'PUT',
      data: params
    })
  },
  fetchPrices: (params) => {
    return axios.get('prices/'+params)
  },
  addItems: (params) => {
    return axios({
      url: 'items',
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: params
    })
  }
}
