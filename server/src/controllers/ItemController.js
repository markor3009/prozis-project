const seq = require('../models/index')

module.exports = {
  addItems (req, res) {
    const id = req.body.id
    const items = req.body.items
    const date = req.body.date
    seq.query('SELECT fak_id FROM faktura WHERE kup_id = ? AND sta_id=1', { replacements: [id], type: seq.QueryTypes.SELECT })
      .then((a) => {
        const fakId = a[0].fak_id
        for (var i = 0; i < items.length; i++) {
          seq.query('INSERT INTO stavka(fak_id, pro_id, kor_id, stk_kolicina, stk_cena, stk_datum, stk_unos) VALUES (?,?,?,?,?,?,NOW())',
            { replacements: [fakId, items[i].product, 1, items[i].quantity, items[i].price, date], type: seq.QueryTypes.INSERT })
        }
      })
      .then(() => {
        res.send('OK')
      })
  },
  deleteItem (req, res) {
    const id = req.body.id
    seq.query('DELETE FROM stavka WHERE stk_id = ?', {
      replacements: [id], type: seq.QueryTypes.DELETE
    }).then(() => {
      res.send('OK')
    })
  }
}
