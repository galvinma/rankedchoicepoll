var mongoose = require('mongoose');
var moment = require('moment');
var ObjectId = require('mongodb').ObjectID;
var Users = require('../.././model/users');
var generateJWT = require('./jwt');
var checkObjectExistance = require('./checkobjectexistance')

module.exports = {
  joinUserOnlyEmail: function(email)
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
    signup_user.email = email;
    signup_user.registered = false;

    signup_user.save(function(err) {
        if (err)
        {
          return {allow: false, message: "Unable to register user"}
        }
    })

    return {allow: false, user: signup_user.id, token: null}
  }
}
