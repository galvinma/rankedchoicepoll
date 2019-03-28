var User = require('../.././model/users');
var checkObjectExistance = require('./checkobjectexistance')

module.exports = {
  appendPollToUser: function(poll_id, user_id)
  {
    return new Promise((resolve, reject) =>
    {
      return User.update({ id: user_id }, {$push: {active_polls: poll_id}}).lean().exec(function(err)
      {
        if (err)
        {
          console.log(err)
          return reject({success: false, message: "Unable to update user. Poll not added"})
        }
        else
        {
          console.log("added to active...")
          return resolve({success: true, message: "Successfully added poll(s) to user"})
        }
      })
    })
  }
}
