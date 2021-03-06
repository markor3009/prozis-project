const seq = require('../models/index')

module.exports = {
  getInvoice (req, res) {
    var buyerId = req.body.id
    var fakId = req.body.inv
    if (fakId !== '') {
      seq.query('SELECT faktura.fak_id, stk_id, stavka.pro_id, pro_naziv, stk_kolicina, stk_cena, stk_datum, stk_unos FROM faktura INNER JOIN stavka ON faktura.fak_id = stavka.fak_id INNER JOIN proizvod ON proizvod.pro_id = stavka.pro_id WHERE faktura.fak_id = ?',
        { replacements: [fakId], type: seq.QueryTypes.SELECT })
        .then((invoice) => {
          res.send(invoice)
        })
    } else {
      seq.query('SELECT faktura.fak_id, stk_id, stavka.pro_id, pro_naziv, stk_kolicina, stk_cena, stk_datum, stk_unos FROM faktura INNER JOIN stavka ON faktura.fak_id = stavka.fak_id INNER JOIN proizvod ON proizvod.pro_id = stavka.pro_id WHERE faktura.sta_id = 1 AND kup_id = ?',
        { replacements: [buyerId], type: seq.QueryTypes.SELECT })
        .then((invoice) => {
          res.send(invoice)
        })
    }
  },
  addInvoice (req, res) {
    var buyerId = req.body.id
    seq.query('INSERT INTO faktura(kup_id, sta_id, fak_od) VALUES (?,1,CURDATE())', {
      replacements: [buyerId],
      type: seq.QueryTypes.INSERT
    })
      .then(() => {
        res.send('OK')
      })
  },
  closeInvoice (req, res) {
    var buyerID = req.body.buyerID
    var invoiceID = req.body.invoiceID
    var invoiceNumber = req.body.invoiceNumber
    var invoiceDate = req.body.invoiceDate
    var invoicePayDate = req.body.invoicePayDate
    var invoiceTraffic = req.body.invoiceTraffic
    var invoiceDesc = req.body.invoiceDesc
    var invoiceTotal = req.body.invoiceTotal
    seq.query('UPDATE faktura SET sta_id = 2 , fak_do = ?, fak_iznos = ?, fak_broj = ?, fak_placanje =?, fak_promet=?, fak_opis=? WHERE fak_id = ?', {
      replacements: [invoiceDate, invoiceTotal, invoiceNumber, invoicePayDate, invoiceTraffic, invoiceDesc, invoiceID],
      type: seq.QueryTypes.UPDATE
    }).then(() => {
      seq.query('INSERT INTO faktura(kup_id, sta_id, fak_od) VALUES (?, 1, CURDATE())', {
        replacements: [buyerID],
        type: seq.QueryTypes.INSERT
      })
    }).then(() => {
      res.send('OK')
    })
  },
  getHistory (req, res) {
    var buyerID = req.body.id
    seq.query('SELECT * FROM faktura WHERE sta_id=2 AND kup_id=?', {
      replacements: [buyerID],
      type: seq.QueryTypes.SELECT
    }).then((history) => {
      res.send(history)
    })
  }
}
