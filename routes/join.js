var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');
var ObjectId = require('mongodb').ObjectID;
var Users = require('.././model/users');
var joinUser = require('.././src/Utils/joinuser')


var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/join')
  .post(function(req, res, next) {

    Users.findOne({ email: req.body.params.email.toUpperCase() }).lean().exec(function(err, docs) {
      if (err)
      {
        res.json({allow: false, message: "Unable to register user"});
        return
      }

      if (docs)
      {
        res.json({allow: false, message: "Email already in use"});
        return
      }
      else
      {
        const joinResult = joinUser.joinUser(req)
        res.json(joinResult);
      }
    })
});

module.exports = router;
