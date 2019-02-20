var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var Poll = require('.././model/poll');

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/newpoll')
  .post(function(req, res, next) {
    console.log("creating new poll")
    var new_poll = new Poll();
    new_poll.admin_id = req.body.params.admin_id
    new_poll.options = req.body.params.options
    new_poll.poll_id = new ObjectId();
    new_poll.poll_items = req.body.params.poll_items
    new_poll.status = true
    new_poll.threshold = 0.5
    new_poll.title = req.body.params.title

    new_poll.save(function(err) {
        if (err)
        {
          console.log("unable")
          res.json({
            allow: false,
            message: "Unable to create poll",
          });
          return
        }
        else
        {
          console.log("able")
          res.json({
            allow: true,
            poll_id: new_poll.poll_id,
          });
        }
    });

  });

module.exports = router;
