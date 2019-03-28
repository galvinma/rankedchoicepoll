var Poll = require('../.././model/poll');
var activeToClosed = require('./activetoclosed')

module.exports = {
  closePoll: async function(poll_id, user_id)
  {
    return new Promise((resolve, reject) =>
    {
      // TODO: Verify admin use is closing the poll

      Poll.update({ poll_id: poll_id }, {status: false}).lean().exec(function(err)
      {
        if (err)
        {
           return reject({success: false, message: "Unable to close poll."})
        }
        else
        {
          // Update Users active_polls --> closed_polls
          Poll.findOne({ poll_id: poll_id }).lean().exec(async function(err, poll) {
            if (err)
            {
              reject({ success: false, message: "Unable to find poll" })
            }

            const members = poll.members
            for (var i=0; i<members.length; i++)
            {
              try
              {
                const closeResponse = await activeToClosed.activeToClosed(poll_id, members[i])
              }
              catch(error)
              {
                reject({ success: false, message: "Unable to find update all users." })
              }
            }

            return resolve({success: true, message: "Successfully closed poll"})
          })
        }
      })
    })
  }
}
