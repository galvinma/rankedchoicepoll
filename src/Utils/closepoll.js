var Poll = require('../.././model/poll');
var activeToClosed = require('./activetoclosed')

module.exports = {
  closePoll: async function(poll_id, user_id)
  {
    return new Promise((resolve, reject) =>
    {
      Poll.findOne({ poll_id: poll_id }, {status: false}).lean().exec(function(err, poll)
      {
        if (err)
        {
           return reject({success: false, message: "Unable to close poll."})
        }
        else
        {
          if (String(poll.admin_id) !== String(user_id))
          {
            return reject({ success: false, message: "Unauthorized user closing poll." })
          }

          Poll.update({ poll_id: poll_id }, {status: false}).lean().exec(async function(err) {
            if (err)
            {
              return reject({ success: false, message: "Unable to find poll." })
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
                return reject({ success: false, message: "Unable to update poll for all users." })
              }
            }

            return resolve({success: true, message: "Successfully closed poll"})
          })
        }
      })
    })
  }
}
