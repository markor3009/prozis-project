const jwt = require('jsonwebtoken')

module.exports = {
  authenticate (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
      jwt.verify(token, 'secretforinvoicingapp', function (err, decoded) {
        if (err) {
          res.send({
            success: false,
            message: 'Failed to authenticate token.'
          })
        } else {
          req.decoded = decoded
          next()
        }
      })
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      })
    }
  }
}
