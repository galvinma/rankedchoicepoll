var User = require('../.././model/users');
var returnPollData = require('./returnpolldata')

module.exports = {
  returnUserPolls: async function(req) {
    return new Promise((resolve, reject) => {
      User.findOne({ id: req.body.params.user_id }).lean().exec(async function(err, user) {
        if (err)
        {
          return reject({ success: false, message: "Unable to find user" })
        }

        const active = []
        const closed = []

        for (var i=0; i<user.active_polls.length; i++)
        {
          try
          {
            const activeData = await returnPollData.returnPollData(user.active_polls[i])
            const appendActiveData = {
              poll_id: activeData.poll_id,
              admin_name: activeData.admin_name,
              title: activeData.title,
              status: activeData.status
            }
            active.push(appendActiveData)
          }
          catch(error)
          {
            continue
          }
        }

        for (var j=0; j<user.closed_polls.length; j++)
        {
          try
          {
            const closedData = await returnPollData.returnPollData(user.closed_polls[j])
            const appendClosedData = {
              poll_id: closedData.poll_id,
              admin_name: closedData.admin_name,
              title: closedData.title,
              status: closedData.status
            }
            closed.push(appendClosedData)
          }
          catch(error)
          {
            continue
          }
        }

        resolve({user_id: user.id, active_polls: active, closed_polls: closed})
      })
    })
  }
}
