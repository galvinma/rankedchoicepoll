var express = require('express');
var Users = require('.././model/users');
var newPass = require('.././src/Utils/newpass')

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/newpass')
  .post(function(req, res, next) {

  // Check if user exists
  Users.findOne({ id: req.body.params.user_id }).lean().exec(async function(err, user) {
    if (err)
    {
      res.json({success: false, message: "Unable to find user"});
      return
    }

    if (user === null ||
        req.body.params.user_id === null ||
        req.body.params.user_id === "" ||
        req.body.params.user_id === undefined ||
        req.body.params.token_hash === null ||
        req.body.params.token_hash === "" ||
        req.body.params.token_hash === undefined ||
        req.body.params.new_password === null ||
        req.body.params.new_password === "" ||
        req.body.params.token_hash === undefined)
    {
      res.json({success: false, message: "Missing required user data"});
      return
    }
    console.log("entering promise")
    const newPassResponse = await newPass.newPass(user, req.body.params.token_hash, req.body.params.new_password)
    console.log(newPassResponse)
    res.json(newPassResponse);
    return
  })
})

module.exports = router;
