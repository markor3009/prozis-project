const seq = require('../models/index')

module.exports = {
  getBuyers (req, res) {
    seq.query('SELECT * FROM kupac', { type: seq.QueryTypes.SELECT })
      .then(b => {
        res.send(b)
      })
  }
}
