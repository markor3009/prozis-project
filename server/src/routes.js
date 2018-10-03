const Sequelize = require('sequelize')
const config = require('./config/config')

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

module.exports = (app) => {
  app.post('/register', (req, res) => {
    sequelize.query('INSERT INTO korisnik (kor_korime) VALUES (\'' + req.body.email + '\')', { type: sequelize.QueryTypes.INSERT })
      .then(() => {
        res.send('success')
      })
  })
}
