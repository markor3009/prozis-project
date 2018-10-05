const TestController = require('./controllers/TestController')
const BuyersController = require('./controllers/BuyersController')
const PricesController = require('./controllers/PricesController')

module.exports = (app) => {
  app.get('/api/register', TestController.register)
  app.get('/api/buyers', BuyersController.getBuyers)
  app.get('/api/prices/:buyId', PricesController.getPrices)
}
