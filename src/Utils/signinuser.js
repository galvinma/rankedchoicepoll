var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Users = require('../.././model/users');
var generateJWT = require('./jwt');
var passwordCompare = require('./passwordcompare')

module.exports = {
  signInUser: function(pass, user)
  {
    return new Promise((resolve, reject) =>
    {
      passwordCompare.passwordCompare(pass, user.password)
      .then((response) => {
        if (response === true)
        {
          var login_user = new Users();
          login_user.id = user.id
          login_user.email = user.email
          login_user.reset_count =  user.reset_count
          login_user.join_date = user.join_date

          var token = generateJWT.generateJWT(login_user)
          return resolve({allow: response, user: login_user.id, token: token})
        }
        else
        {
          return reject({allow: false})
        }
      })
      .catch((error) => {
          return reject({allow: false})
      })
    })
  }
}
