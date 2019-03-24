var Poll = require('../.././model/poll');
var checkObjectExistance = require('./checkobjectexistance')

module.exports = {
  appendUserToPoll: function(poll_id, user_id)
  {
    return new Promise((resolve, reject) =>
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
    })
  }
}
