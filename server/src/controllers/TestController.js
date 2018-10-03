const seq = require('../models/index')

module.exports = {
  register (req, res) {
    seq.query('SELECT * FROM korisnik', { type: seq.QueryTypes.SELECT })
      .then(k => {
        res.send(k)
      })
  }
}
