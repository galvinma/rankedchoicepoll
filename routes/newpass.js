var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
var Users = require('.././model/users');
var passJWT = require('.././src/Utils/passreset');

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/newpass')
  .post(function(req, res, next) {

  // Check if user exists
  Users.findOne({ id: req.body.params.user_id }).lean().exec(function(err, user) {
    if (err)
    {
      res.json({
          success: false,
      });
      return
    }

    // Check for blanks and invalid input
    if (user === null || req.body.params.user_id === null || req.body.params.user_id === "")
    {
      res.json({
          success: false,
      });
      return
    }

    // Check for blanks and invalid input
    if (req.body.params.user_id === null || req.body.params.user_id === "" ||
        req.body.params.token_hash === null || req.body.params.token_hash === "" ||
        req.body.params.new_password === null || req.body.params.new_password === "")
    {
      res.json({
          success: false,
      });
      return
    }

    // Verify token matches that for provided user
    let token_hash = req.body.params.token_hash

    jwt.verify(token_hash, process.env.REACT_APP_JWT_SECRET, function(err, decoded) {
        if (String(decoded.id) !== String(user.id) ||
            decoded.reset_count !== user.reset_count ||
            decoded.join_date !== user.join_date)
        {
          res.json({
              success: false,
          });
          return
        }
        else
        {
          bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
              if (err) return next(err);

              bcrypt.hash(req.body.params.new_password, salt, (err, hash) => {
                  if (err) return next(err);

                  Users.update({ id: req.body.params.user_id }, {password: hash , reset_count: user.reset_count + 1} ).lean().exec(function(err, user) {
                    if (err)
                    {
                      throw err
                    }

                    res.json({
                      success: true,
                    });
                  });

                  next();
              });
          });
        }
    });
  })
})

module.exports = router;
