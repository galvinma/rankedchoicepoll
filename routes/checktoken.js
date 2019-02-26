var express = require('express');

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/checktoken')
  .post(function(req, res, next) {
    var token = req.body.params.token
    var user_id = req.body.params.user

    const checkTokenResponse = checkToken.checkToken(req, token, user_id)
    res.json(checkTokenResponse)
    return
  })

module.exports = router;
