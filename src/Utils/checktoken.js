var jwt = require('jsonwebtoken');
var Users = require('../.././model/users');

module.exports = { 
  checkToken: function()
  {
    jwt.verify(token, process.env.REACT_APP_JWT_SECRET, function(err, decoded) {
      if (err)
      {
        return {allow: false, user: null, token: null}
      }

      Users.findOne({ id: user_id }).lean().exec(function(err, user) {
        if (err)
        {
          return {allow: false, user: null, token: null}
        }

        if (user === null ||
            user === "" ||
            user === undefined ||
            req.body.params.user === null ||
            req.body.params.user === "" ||
            req.body.params.user === undefined ||
            req.body.params.token === null ||
            req.body.params.token === "" ||
            req.body.params.token === undefined ||
            String(decoded.id) !== String(user.id) ||
            decoded.reset_count !== user.reset_count ||
            decoded.join_date !== user.join_date))
        {
          return {allow: false, user: null, token: null}
        }

        return {allow: true, user: user, token: token}
      })
    })
  }
}
