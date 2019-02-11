var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var Poll = require('.././model/poll');

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/returnpoll')
  .post(function(req, res, next) {

    if (req.body.params.poll_id === 'null')
    {
      return
    }
    Poll.findOne({ poll_id: req.body.params.poll_id }).lean().exec(function(err, poll) {
      if (err)
      {
        throw err
      }

      res.json({
        title: poll.title,
      });

    });
  });

module.exports = router;
