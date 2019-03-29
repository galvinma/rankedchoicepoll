var express = require('express');
var returnPollData = require('.././src/Utils/returnpolldata')
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

    returnPollData.returnPollData(req.body.params.poll_id)
    .then((retPollResponse) => {
      res.json(retPollResponse)
      return
    })
    .catch((error)=>{
      res.json(retPollResponse)
      return
    });
  });

module.exports = router;
