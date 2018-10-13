const seq = require('../models/index')

module.exports = {
  getInvoice (req, res) {
    var buyerId = req.body.id
    seq.query('SELECT faktura.fak_id, stk_id, stavka.pro_id, pro_naziv, stk_kolicina, stk_cena FROM faktura INNER JOIN stavka ON faktura.fak_id = stavka.fak_id INNER JOIN proizvod ON proizvod.pro_id = stavka.pro_id WHERE faktura.sta_id = 1 AND kup_id = ?',
      { replacements: [buyerId], type: seq.QueryTypes.SELECT })
      .then((invoice) => {
        res.send(invoice)
      })
  },
  addInvoice (req, res) {
    var buyerId = req.body.id
    seq.query('INSERT INTO faktura(kup_id, sta_id) VALUES (?,1)', {
      replacements: [buyerId],
      type: seq.QueryTypes.INSERT
    })
      .then(() => {
        res.send('OK')
      })
  }
}
