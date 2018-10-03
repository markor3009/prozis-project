const TestController = require('./controllers/TestController')

module.exports = (app) => {
  app.post('/register', TestController.register)
}
