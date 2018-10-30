const seq = require('../models/index')
const jwt = require('jsonwebtoken')

module.exports = {
  register (req, res) {
    res.send('MARKO')
  },
  login (req, res) {
    const u = req.body
    seq.query('SELECT * FROM korisnik WHERE kor_korime = ? AND kor_sifra = ?', {
      replacements: [u.username, u.password], type: seq.QueryTypes.SELECT
    }).then((users) => {
      if (users.length > 0) {
        let token = jwt.sign(users[0], 'secretforinvoicingapp', {
          expiresIn: 60 * 60 // expires in 1 hour
        })
        res.send({
          status: true,
          token: token
        })
      } else {
        res.send({
          status: false,
          u: users
        })
      }
    })
  }
}
