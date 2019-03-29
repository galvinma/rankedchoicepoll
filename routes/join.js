var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');
var ObjectId = require('mongodb').ObjectID;
var Users = require('.././model/users');
var joinUser = require('.././src/Utils/joinuser')
var joinExistingUser = require('.././src/Utils/joinexistinguser')
var checkObjectExistance = require('.././src/Utils/checkobjectexistance')


var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/join')
  .post(function(req, res, next) {

    Users.findOne({email: req.body.params.email.toUpperCase()}).lean().exec(async function(err, docs) {
      if (err)
      {
        res.json({allow: false, message: "Unable to register user"});
        return
      }

      if (docs && docs.registered === true)
      {
        res.json({allow: false, message: "Email already in use"});
        return
      }
      else
      {
        let check = [req.body.params.firstname, req.body.params.lastname, req.body.params.email, req.body.params.password]
        for (var i=0; i<check.length; i++)
        {
          if (checkObjectExistance.checkObjectExistance(check[i]) === false)
          {
            res.json({allow: false, message: "Missing required parameters"});
            return
          }
        }

        const firstname = req.body.params.firstname;
        const lastname = req.body.params.lastname;
        const email = req.body.params.email;
        const password = req.body.params.password;

        if (docs === undefined || docs === null)
        {
          const joinResult = joinUser.joinUser(firstname, lastname, email, password)
          res.json(joinResult);
        }
        else
        {
          if (docs.registered === false)
          {
            const joinResult = await joinExistingUser.joinExistingUser(firstname, lastname, email, password)
            res.json(joinResult);
          }
          else
          {
            res.json({allow: false, message: "Unable to join user"});
            return
          }
        }
      }
    })
});

module.exports = router;
