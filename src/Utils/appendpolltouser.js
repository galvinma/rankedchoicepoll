var User = require('../.././model/users');
var checkObjectExistance = require('./checkobjectexistance')
var checkIfPollMember = require('./checkifpollmember')

module.exports = {
  appendPollToUser: function(poll_id, user_id)
  {
    return new Promise((resolve, reject) =>
    {
      User.findOne({ id: user_id }).lean().exec(function(err, user)
      {
        if (err)
        {
          return reject({success: false, message: "Unable to update user. Poll not added"})
        }
        else
        {
          if (checkIfPollMember.checkIfPollMember(user.active_polls, poll_id) === true)
          {

            return resolve({success: true, message: "User already in poll"})
          }
          else
          {
            User.update({ id: user_id }, {$push: {active_polls: poll_id}}).lean().exec(function(err)
            {
              if (err)
              {
                return reject({success: false, message: "Unable to update user. Poll not added"})
              }
              else
              {
                return resolve({success: true, message: "Successfully added poll(s) to user"})
              }
            })
          }
        }
      })
    })
  }
}
