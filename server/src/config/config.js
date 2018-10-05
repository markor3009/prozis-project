const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  port: 8081,
  db: {
    database: process.env.DB_NAME || 'prozis',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'marko',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost',
      operatorsAliases: Op
    },
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: true
    }
  }
}
