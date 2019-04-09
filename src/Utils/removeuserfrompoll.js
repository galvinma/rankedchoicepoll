var Poll = require('../.././model/poll');
var User = require('../.././model/users');
var ObjectId = require('mongodb').ObjectID;
var checkObjectExistance = require('./checkobjectexistance')
var returnMongoArrayIndex = require('./returnmongoarrayindex')

module.exports = {
  removeUserFromPoll: function(poll_id, user_id)
  {
    return new Promise((resolve, reject) =>
    {
      Poll.findOne({ poll_id: poll_id }).lean().exec(function(err, poll)
      {
        if (err)
        {
           return reject({success: false, message: "Unable to find poll. Member not removed"})
        }
        else
        {
          let pollMembers = poll.members
          const ind = returnMongoArrayIndex.returnMongoArrayIndex(pollMembers, user_id)
          if (ind !== -1 && ind !== undefined)
          {
            pollMembers = pollMembers.slice(0, ind).concat(pollMembers.slice(ind+1))
          }
          else
          {
            return reject({success: false, message: "Unable to update poll. Member not found"})
          }

          Poll.update({ poll_id: poll_id }, {members: pollMembers}).lean().exec(function(err)
          {
            if (err)
            {
               return reject({success: false, message: "Unable to update poll. Member not removed"})
            }
            else
            {
               return resolve({success: true, message: "Successfully removed member from poll"})
            }
          })
        }
      })
    })
  }
}
