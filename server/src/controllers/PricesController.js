const seq = require('../models/index')

module.exports = {
  getPrices (req, res) {
    seq.query('SELECT proizvod.pro_id,cenovnik.cen_cena,proizvod.pro_naziv FROM cenovnik INNER JOIN proizvod ON cenovnik.proizvod_pro_id = proizvod.pro_id WHERE kupac_kup_id = ' + req.params.buyId, { type: seq.QueryTypes.SELECT })
      .then(p => {
        res.send(p)
      })
  }
}
