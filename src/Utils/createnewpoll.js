var Poll = require('../.././model/poll');
var ObjectId = require('mongodb').ObjectID;

module.exports = {
  createNewPoll: function(admin_id, options, poll_items, title)
  {
    var new_poll = new Poll()
    new_poll.admin_id = admin_id
    new_poll.options = options
    new_poll.poll_id = new ObjectId()
    new_poll.poll_items = poll_items
    new_poll.status = true
    new_poll.threshold = 0.5
    new_poll.title = title
    new_poll.members = [new_poll.admin_id]

    new_poll.save(function(err)
    {
      if (err)
      {
        return {allow: false, message: "Unable to create poll"}
      }
    })

    return {allow: true, poll_id: new_poll.poll_id}
  }
}
