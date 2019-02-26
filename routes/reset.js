var express = require('express');
var resetUserPassword = require('.././src/Utils/resetuserpassword')

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/reset')
  .post(function(req, res, next) {
    const resetResponse = resetUserPassword.resetUserPassword(req)
    res.json(resetResponse)
    return
})
module.exports = router;
