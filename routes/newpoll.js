var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var Poll = require('.././model/poll');

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/newpoll')
  .post(function(req, res, next) {

    var new_poll = new Poll();
    new_poll.poll_id = new ObjectId();
    new_poll.user_id = req.body.params.user_id
    new_poll.title = req.body.params.title

    new_poll.save(function(err) {
        if (err)
        {
          res.json({
            allow: false,
            message: "Unable to create poll",
          });
          return
        }
        else
        {
          res.json({
            allow: true,
            poll_id: new_poll.poll_id,
          });
        }
    });

  });

module.exports = router;
