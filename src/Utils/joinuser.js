var mongoose = require('mongoose');
var moment = require('moment');
var ObjectId = require('mongodb').ObjectID;
var Users = require('../.././model/users');
var generateJWT = require('./jwt');
var checkObjectExistance = require('./checkobjectexistance')

module.exports = {
  joinUser: function(firstname, lastname, email, password)
  {
    const args = Object.values(arguments)
    for (var i=0; i<args.length; i++)
    {
      if (checkObjectExistance.checkObjectExistance(args[i]) === false)
      {
        return {allow: false, message: "Missing required parameters"}
      }
    }

    var signup_user = new Users();
    signup_user.id = new ObjectId();
    signup_user.firstname = firstname;
    signup_user.lastname = lastname;
    signup_user.email = email.toUpperCase();
    signup_user.password = password;
    signup_user.join_date = moment().unix();
    signup_user.reset_count = 0;
    signup_user.registered = true;

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
