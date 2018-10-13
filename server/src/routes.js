const TestController = require('./controllers/TestController')
const BuyersController = require('./controllers/BuyersController')
const PricesController = require('./controllers/PricesController')
const ItemController = require('./controllers/ItemController')
const ProductsController = require('./controllers/ProductsController')
const InvoiceController = require('./controllers/InvoiceController')

module.exports = (app) => {
  app.get('/api/register', TestController.register)
  app.get('/api/buyers', BuyersController.getBuyers)
  app.post('/api/buyers', BuyersController.addBuyer)
  app.put('/api/buyers', BuyersController.updateBuyers)
  app.get('/api/prices/:buyId', PricesController.getPrices)
  app.post('/api/items', ItemController.addItems)
  app.get('/api/products', ProductsController.getProducts)
  app.put('/api/invoices', InvoiceController.getInvoice)
  app.post('/api/invoices', InvoiceController.addInvoice)
}
