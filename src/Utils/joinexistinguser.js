var mongoose = require('mongoose');
var moment = require('moment');
var ObjectId = require('mongodb').ObjectID;
var Users = require('../.././model/users');
var generateJWT = require('./jwt');
var checkObjectExistance = require('./checkobjectexistance')
var hashPassword = require('./hashpassword')

module.exports = {
  joinExistingUser: function(firstname, lastname, email, password)
  {
    return new Promise(async(resolve, reject) => {
      const args = Object.values(arguments)
      for (var i=0; i<args.length; i++)
      {
        if (checkObjectExistance.checkObjectExistance(args[i]) === false)
        {
          return reject({allow: false, message: "Missing required parameters"})
        }
      }

      const hash = await hashPassword.hashPassword(password)

      Users.findOneAndUpdate({ email: email }, {
        firstname: firstname,
        lastname: lastname,
        password: hash,
        join_date: moment().unix(),
        reset_count: 0,
        registered: true,
      }).lean().exec(function(err, user)
      {
        if (err)
        {
          return reject({success: false, message: "Unable to register user."})
        }

        var tokenInput = {
         id: user.id,
         email: user.email,
         reset_count: user.reset_count,
         join_date: user.join_date
        };

        var token = generateJWT.generateJWT(tokenInput)
        return resolve({allow: true, user: user.id, token: token})
      })
    })
  }
}
