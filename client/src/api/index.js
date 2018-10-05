import {default as axios} from './config.js'

export default {
  register: () =>{
    return axios.get('register');
  },
  fetchBuyers: () => {
    return axios.get('buyers')
  },
  fetchPrices: (params) => {
    return axios.get('prices/'+params)
  }
}
