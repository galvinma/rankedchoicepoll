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

    const retPollResponse = returnPoll.returnPoll(req)
    res.json(retPollResponse)
    return
  });

module.exports = router;
