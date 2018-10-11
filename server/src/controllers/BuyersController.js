const seq = require('../models/index')

module.exports = {
  getBuyers (req, res) {
    seq.query('SELECT * FROM kupac WHERE kup_id<>500', { type: seq.QueryTypes.SELECT })
      .then(b => {
        res.send(b)
      })
  },
  updateBuyers (req, res) {
    var buyer = req.body
    seq.query('UPDATE kupac SET kup_naziv=?, kup_pib=?, kup_adresa=? WHERE kup_id=?',
      { replacements: [buyer.kup_naziv, buyer.kup_pib, buyer.kup_adresa, buyer.kup_id], type: seq.QueryTypes.UPDATE })
      .then(() => {
        for (var i = 0; i < buyer.prices.length; i++) {
          var product = buyer.prices[i]
          seq.query('UPDATE cenovnik SET cen_cena=? WHERE kupac_kup_id=? AND proizvod_pro_id=?',
            { replacements: [product.cen_cena, buyer.kup_id, product.pro_id], type: seq.QueryTypes.UPDATE })
        }
        res.send('OK')
      })
  }
}
