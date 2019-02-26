var mongoose = require('mongoose');
var moment = require('moment');
var ObjectId = require('mongodb').ObjectID;
var Users = require('../.././model/users');
var generateJWT = require('./jwt');

module.exports = {
  joinUser: function(req)
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
          return {allow: false, message: "Unable to register user"}
        }
    })
    var token = generateJWT.generateJWT(signup_user)
    return {allow: true, user: signup_user.id, token: token}
  }
}
