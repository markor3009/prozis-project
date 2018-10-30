import {default as axios} from './config.js'

export default {
  register: () =>{
    return axios.get('register');
  },
  login: (params) =>{
    console.log(params);
    return axios({
      url: 'login',
      method: 'POST',
      data: params
    })
  },
  fetchBuyers: () => {
    return axios.get('buyers', {
      headers: {"x-access-token": localStorage.getItem("token")}
    })
  },
  updateBuyers: (params) => {
    return axios({
      url: 'buyers',
      method: 'PUT',
      data: params
    })
  },
  addBuyer: (params) => {
    return axios({
      url: 'buyers',
      method: 'POST',
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
  },
  deleteItem: (params) => {
    return axios({
      url: 'items',
      method: 'DELETE',
      data: {id: params}
    })
  },
  fetchProducts: () => {
    return axios({
      url: 'products',
      method: 'GET'
    })
  },
  updateProducts: (params) => {
    return axios({
      url: 'products',
      method: 'POST',
      data: params
    })
  },
  fetchInvoice: (params) => {
    return axios({
      url: 'invoices',
      method: 'PUT',
      data: params
    })
  },
  addInvoice: (params) => {
    return axios({
      url: 'invoices',
      method: 'POST',
      data: params
    })
  },
  closeInvoice: (params) => {
    return axios ({
      url:'close',
      method: 'POST',
      data: params
    })
  },
  fetchHistory: (params) => {
    return axios ({
      url: 'history',
      method: 'PATCH',
      data: {id:params}
    })
  }
}
