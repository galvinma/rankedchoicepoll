var express = require('express');
var castVote = require('.././src/Utils/castvote')

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/castvote')
  .post(function(req, res, next) {
    if (req.body.params.poll_id === 'null' ||
        req.body.params.vote === 'null' ||
        req.body.params.user_id === 'null' ||
        req.body.params.user_id === '' ||
        req.body.params.user_id === null )
    {
      res.json({success: false, message: "Unable to cast vote"});
      return
    }

    const voteResponse = castVote.castVote(req)
    res.json(voteResponse)
    return
  })

module.exports = router;
