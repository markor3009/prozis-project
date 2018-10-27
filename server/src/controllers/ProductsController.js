const seq = require('../models/index')

module.exports = {
  getProducts (req, res) {
    seq.query('SELECT pro_id, pro_naziv, cenovnik.cen_cena FROM proizvod INNER JOIN cenovnik ON proizvod.pro_id = cenovnik.proizvod_pro_id WHERE kupac_kup_id = 3', { type: seq.QueryTypes.SELECT })
      .then((p) => {
        res.send(p)
      })
  },
  updateProducts (req, res) {
    let products = req.body
    for (var i = 0; i < products.length; i++) {
      seq.query('UPDATE cenovnik SET cen_cena = ? WHERE kupac_kup_id=3 AND proizvod_pro_id=?', {
        replacements: [products[i].cen_cena, products[i].pro_id], type: seq.QueryTypes.UPDATE })
    }
    res.send('OK')
  }
}
