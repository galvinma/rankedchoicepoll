var Poll = require('../.././model/poll');
var User = require('../.././model/users');
var checkObjectExistance = require('./checkobjectexistance')
var returnMongoArrayIndex = require('./returnmongoarrayindex')

module.exports = {
  removePollFromUser: function(poll_id, user_id)
  {
    return new Promise((resolve, reject) =>
    {
      User.findOne({ id: user_id }).lean().exec(function(err, user)
      {
        if (err)
        {
           return reject({success: false, message: "Unable to find user. Poll not removed"})
        }
        else
        {
          let activePolls = user.active_polls
          let closedPolls = user.closed_polls
          const activeInd = returnMongoArrayIndex.returnMongoArrayIndex(activePolls, poll_id)
          const closedInd = returnMongoArrayIndex.returnMongoArrayIndex(closedPolls, poll_id)

          if (activeInd === -1 && closedInd === -1)
          {
            return reject({success: false, message: "Unable to update user. Poll not found"})
          }

          if (activeInd !== -1 && activeInd !== undefined)
          {
            activePolls = activePolls.slice(0, activeInd).concat(activePolls.slice(activeInd+1))

          }

          if (closedInd !== -1 && closedInd !== undefined)
          {
            closedPolls = closedPolls.slice(0, closedInd).concat(closedPolls.slice(closedInd+1))

          }

          User.update({ id: user_id }, {active_polls: activePolls, closed_polls: closedPolls}).lean().exec(function(err)
          {
            if (err)
            {
               return reject({success: false, message: "Unable to update user. Poll not removed"})
            }
            else
            {
               return resolve({success: true,
                 message: "Successfully removed poll from member",
                 active_polls: activePolls,
                 closed_polls: closedPolls,
               })
            }
          })
        }
      })
    })
  }
}
