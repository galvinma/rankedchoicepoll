var jwt = require('jsonwebtoken');
var Users = require('../.././model/users');
var checkObjectExistance = require('./checkobjectexistance')

module.exports = {
  compareToken: function(decoded, token, user_id)
  {
    return new Promise((resolve, reject) =>
    {
      return Users.findOne({ id: user_id }).lean().exec(function(err, user)
      {
        if (err)
        {
          return reject({allow: false, message: "Unable to find user",  user: null, token: null})
        }
        else
        {
          if (checkObjectExistance.checkObjectExistance(user) === false ||
              checkObjectExistance.checkObjectExistance(token) === false ||
              checkObjectExistance.checkObjectExistance(user_id) === false ||
              String(decoded.id) !== String(user.id) ||
              decoded.reset_count !== user.reset_count ||
              decoded.join_date !== user.join_date)
          {
            return reject({allow: false, message: "Provided tokens do not match", user: null, token: null})
          }
          else
          {
            return resolve({allow: true, message: "Successfully decoded token", user: user_id, token: token})
          }
        }
      })
    })
  }
}
