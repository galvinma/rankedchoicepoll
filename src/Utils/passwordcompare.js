var bcrypt = require('bcrypt');

module.exports = {
  passwordCompare: function(provided, stored)
  {
    return new Promise((resolve, reject) =>
    {
      bcrypt.compare(provided, stored, function(err, response)
      {
        if (err)
        {
          return reject(err)
        }
        else
        {
          return resolve(response)
        }
      })
    })
  }
}
