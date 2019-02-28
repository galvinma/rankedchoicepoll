var jwt = require('jsonwebtoken');
var Users = require('../.././model/users');
var checkObjectExistance = require('./checkobjectexistance')
var compareToken = require('./comparetoken')

module.exports = {
  checkToken: function(token, user_id)
  {
    jwt.verify(token, process.env.REACT_APP_JWT_SECRET, function(err, decoded) {
      if (err)
      {
        return {allow: false, message: "Unable to decode token", user: null, token: null}
      }

      compareToken.compareToken(decoded, token, user_id)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error
      })
    })
  }
}
