var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var Poll = require('.././model/poll')
var Vote = require('.././model/vote')

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/castvote')
  .post(function(req, res, next) {
    if (req.body.params.poll_id === 'null' || req.body.params.vote === 'null')
    {
      return
    }

    if (req.body.params.user_id === 'null' || req.body.params.user_id === '' || req.body.params.user_id === null)
    {
      return
    }



    Poll.findOne({ poll_id: req.body.params.poll_id }).lean().exec(function(err, poll) {
      if (err)
      {
        throw err
      }

      // process vote object to an array
      let a = []
      for (var i=0; i<req.body.params.vote.length; i++)
      {
        a.push(req.body.params.vote[i].content)
      }

      var vote = new Vote();
      vote.user_id = req.body.params.user_id
      vote.vote = a

      Poll.update({ poll_id: req.body.params.poll_id }, {$push: {votes: vote}}).lean().exec(function(err) {
        if (err)
        {
          throw err
        }

        res.json({
          success: true,
        });
      })

    })
  });

module.exports = router;
