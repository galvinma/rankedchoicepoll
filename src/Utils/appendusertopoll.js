var Poll = require('../.././model/poll');
var checkObjectExistance = require('./checkobjectexistance')
var checkIfPollMember = require('./checkifpollmember')

module.exports = {
  appendUserToPoll: function(poll_id, user_id)
  {
    return new Promise((resolve, reject) =>
    {
      Poll.findOne({ poll_id: poll_id }).lean().exec(function(err, poll)
      {
        if (err)
        {
           return reject({success: false, message: "Unable to update poll. Member not added"})
        }
        else
        {
          if (checkIfPollMember.checkIfPollMember(poll.members, user_id) === true)
          {
            return resolve({success: true, message: "User already in poll"})
          }
          else
          {
            Poll.update({ poll_id: poll_id }, {$push: {members: user_id}}).lean().exec(function(err)
            {
              if (err)
              {
                 return reject({success: false, message: "Unable to update poll. Member not added"})
              }
              else
              {
                 return resolve({success: true, message: "Successfully added member(s) to poll"})
              }
            })
          }
        }
      })
    })
  }
}
