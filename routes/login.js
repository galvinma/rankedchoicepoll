var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Users = require('.././model/users');
var generateJWT = require('.././src/Utils/jwt');

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/login')
  .post(function(req, res, next) {
      Users.findOne({ email: req.body.params.email }).lean().exec(function(err, docs) {
        if (err)
        {
          res.json({
              allow: false,
          });
          return
        }

        if (docs === null || docs.password === null)
        {
          res.json({
              allow: false,
          });
          return
        }

        if (req.body.params.password === null || req.body.params.password === undefined || req.body.params.password === "")
        {
          res.json({
              allow: false,
          });
          return
        }

        bcrypt.compare(req.body.params.password, docs.password, function(err, response) {
          if (err)
          {
            res.json({
                allow: false,
            });
            return
          }
          else
          {
            // create token
            var login_user = new Users();
            login_user.id = docs.id
            login_user.email = docs.email
            login_user.reset_count =  docs.reset_count
            login_user.join_date = docs.join_date

            var token = generateJWT.generateJWT(login_user)
            res.json({
                allow: response,
                user: login_user.id,
                token: token,
            });
          }
        });

      });
  });

module.exports = router;
