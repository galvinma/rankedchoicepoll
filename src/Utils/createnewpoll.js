var Poll = require('../.././model/poll');
var ObjectId = require('mongodb').ObjectID;

module.exports = {
  createNewPoll: function()
  {
    var new_poll = new Poll();
    new_poll.admin_id = req.body.params.admin_id
    new_poll.options = req.body.params.options
    new_poll.poll_id = new ObjectId();
    new_poll.poll_items = req.body.params.poll_items
    new_poll.status = true
    new_poll.threshold = 0.5
    new_poll.title = req.body.params.title

    new_poll.save(function(err)
    {
      if (err)
      {
        return {allow: false, message: "Unable to create poll"}
      }

      return {allow: true, poll_id: new_poll.poll_id}
    })
  }
}
