var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');
var ObjectId = require('mongodb').ObjectID;
var Users = require('.././model/users');
var generateJWT = require('.././src/Utils/jwt');

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/join')
  .post(function(req, res, next) {

    Users.findOne({ email: req.body.params.email.toUpperCase() }).lean().exec(function(err, docs) {
      if (err)
      {
        res.json({
            allow: false,
        });
        return
      }

    if (docs)
    {
      res.json({
        allow: false,
        message: "Email already in use",
      });
      return
    }
    else
    {
      var signup_user = new Users();
      signup_user.id = new ObjectId();
      signup_user.firstname = req.body.params.firstname;
      signup_user.lastname = req.body.params.lastname;
      signup_user.email = req.body.params.email;
      signup_user.password = req.body.params.password;
      signup_user.join_date = moment().unix();
      signup_user.reset_count = 0;

      signup_user.save(function(err) {
          if (err)
          {
            res.json({
              allow: false,
              message: "Unable to register user",
            });
            return
          }
          else
          {
            // create token
            var token = generateJWT.generateJWT(signup_user)
            res.json({
              allow: true,
              user: signup_user.id,
              token: token,
            });
          }
      });
    }
  })
});

module.exports = router;
