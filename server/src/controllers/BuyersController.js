const seq = require('../models/index')

module.exports = {
  getBuyers (req, res) {
    seq.query('SELECT * FROM kupac WHERE kup_id<>3', { type: seq.QueryTypes.SELECT })
      .then(b => {
        var response = {
          success: true,
          buyers: b
        }
        res.send(response)
      })
  },
  updateBuyers (req, res) {
    var buyer = req.body
    seq.query('UPDATE kupac SET kup_naziv=?, kup_pib=?, kup_adresa=?, kup_pozbr=?, kup_mesto=? WHERE kup_id=?',
      { replacements: [buyer.kup_naziv, buyer.kup_pib, buyer.kup_adresa, buyer.kup_pozbr, buyer.kup_mesto, buyer.kup_id], type: seq.QueryTypes.UPDATE })
      .then(() => {
        for (var i = 0; i < buyer.prices.length; i++) {
          var product = buyer.prices[i]
          seq.query('UPDATE cenovnik SET cen_cena=? WHERE kupac_kup_id=? AND proizvod_pro_id=?',
            { replacements: [product.cen_cena, buyer.kup_id, product.pro_id], type: seq.QueryTypes.UPDATE })
        }
        res.send('OK')
      })
  },
  addBuyer (req, res) {
    var buyer = req.body
    seq.query('INSERT INTO kupac(kup_naziv, kup_pib, kup_adresa, kup_pozbr, kup_mesto) VALUES (?, ?, ?, ?, ?)',
      { replacements: [buyer.kup_naziv, buyer.kup_pib, buyer.kup_adresa, buyer.kup_pozbr, buyer.kup_mesto], type: seq.QueryTypes.INSERT })
      .then(() => {
        for (var i = 0; i < buyer.prices.length; i++) {
          var product = buyer.prices[i]
          seq.query('INSERT INTO cenovnik(kupac_kup_id, proizvod_pro_id, cen_cena) VALUES ((SELECT max(kup_id) FROM kupac), ? , ?)',
            { replacements: [product.pro_id, product.cen_cena], type: seq.QueryTypes.INSERT })
        }
      })
      .then(() => {
        seq.query('INSERT INTO faktura(kup_id, sta_id) VALUES ((SELECT max(kup_id) as id FROM kupac),1)', { type: seq.QueryTypes.INSERT })
          .then(() => {
            res.send('OK')
          })
      })
  }
}
