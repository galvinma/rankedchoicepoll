var Poll = require('../.././model/poll');
var ObjectId = require('mongodb').ObjectID;
var appendPollToUser = require('./appendpolltouser')
var returnUserData = require('./returnuserdata')

module.exports = {
  createNewPoll: async function(admin_id, options, poll_items, title, members)
  {
    let userData = await returnUserData.returnUserData(admin_id)

    var new_poll = new Poll()
    new_poll.admin_id = admin_id
    new_poll.admin_name = userData.user.firstname + " " + userData.user.lastname
    new_poll.options = options
    new_poll.poll_id = new ObjectId()
    new_poll.poll_items = poll_items
    new_poll.status = true
    new_poll.threshold = 0.5
    new_poll.title = title
    new_poll.members = members

    new_poll.save(function(err)
    {
      if (err)
      {
        return {allow: false, message: "Unable to create poll"}
      }
    })

    for (var i=0; i<members.length; i++)
    {
      try
      {
        let appendPoll = await appendPollToUser.appendPollToUser(new_poll.poll_id, members[i])
      }
      catch(error)
      {
        return(error)
      }
    }

    return {allow: true, poll_id: new_poll.poll_id}
  }
}
