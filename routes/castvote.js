var express = require('express');
var handleVote = require('.././src/Utils/handlevote')
var checkObjectExistance = require('.././src/Utils/checkobjectexistance')

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/castvote')
  .post(function(req, res, next) {
    let check = [req.body.params.poll_id, req.body.params.vote, req.body.params.user_id]
    for (var i=0; i<check.length; i++)
    {
      if (checkObjectExistance.checkObjectExistance(check[i]) === false)
      {
        res.json({success: false, message: "Unable to cast vote"});
        return
      }
    }

    const poll_id = req.body.params.poll_id
    const vote = req.body.params.vote
    const user_id = req.body.params.user_id
    handleVote.handleVote(poll_id, vote, user_id)
    .then((response) => {
      res.json(response)
      return
    })
    .catch((error) => {
      res.json(error)
      return
    })
  })

module.exports = router;
