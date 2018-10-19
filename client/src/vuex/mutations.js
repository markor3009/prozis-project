export default {
  STORE_USERS(state, users){
    state.users = users;
  },
  STORE_BUYERS(state, buyers){
    state.buyers = buyers;
  },
  STORE_PRICES(state, payload){
    for(var i = 0; i < state.buyers.length; i++){
      if(state.buyers[i].kup_id == payload.id){
        state.buyers[i].prices = payload.prices
      }
    }
  },
  STORE_PRODUCTS(state, payload){
    state.products = payload;
  },
  STORE_INVOICE(state, payload){
    state.invoice = payload;
  }
}
