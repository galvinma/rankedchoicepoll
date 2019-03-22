var mongoose = require('mongoose');
var moment = require('moment');
var ObjectId = require('mongodb').ObjectID;
var Users = require('../.././model/users');
var generateJWT = require('./jwt');
var checkObjectExistance = require('./checkobjectexistance')

module.exports = {
  joinExistingUser: function(firstname, lastname, email, password)
  {
    const args = Object.values(arguments)
    for (var i=0; i<args.length; i++)
    {
      if (checkObjectExistance.checkObjectExistance(args[i]) === false)
      {
        return {allow: false, message: "Missing required parameters"}
      }
    }

    Users.update({ email: email }, {firstname: firstname ,
      lastname: lastname,
      password: password,
      join_date: moment().unix(),
      reset_count: 0,
      registered: true,
    }).lean().exec(function(err, user)
    {
      if (err)
      {
        return {success: false, message: "Unable to register user."}
      }

      return {success: true, message: "Successfully registered user"}
    })
    var token = generateJWT.generateJWT(signup_user)
    return {allow: true, user: user.id, token: token}
  }
}
