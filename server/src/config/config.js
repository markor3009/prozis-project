const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'prozis',
    user: process.env.DB_USER || 'prozis',
    password: process.env.DB_PASS || 'mlatajetrso',
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
