var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Users = require('../.././model/users');
var generateJWT = require('./jwt');

module.exports = {
  signInUser: function(req, user)
  {
    return new Promise((resolve, reject) => {
      bcrypt.compare(req.body.params.password, user.password, function(err, response) {
        if (response === true)
        {
          var login_user = new Users();
          login_user.id = user.id
          login_user.email = user.email
          login_user.reset_count =  user.reset_count
          login_user.join_date = user.join_date

          var token = generateJWT.generateJWT(login_user)
          resolve({allow: response, user: login_user.id, token: token})
        }
        else
        {
          reject({allow: false})
        }
      });
    })

  }
}
