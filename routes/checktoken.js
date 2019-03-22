var express = require('express');
var checkToken = require('.././src/Utils/checkToken')

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/checktoken')
  .post(function(req, res, next) {
    var token = req.body.params.token
    var user_id = req.body.params.user

    checkToken.checkToken(token, user_id)
    .then(checkTokenResponse => {
      res.json(checkTokenResponse)
      return
    })
    .catch(error => {
      res.json(error)
      return
    })
  })

module.exports = router;
