var express = require('express');
var resetUserPassword = require('.././src/Utils/resetuserpassword')

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/reset')
  .post(async function(req, res, next) {
    const resetResponse = await resetUserPassword.resetUserPassword(req)
    console.log(resetResponse)
    res.json(resetResponse)
    return
})
module.exports = router;
