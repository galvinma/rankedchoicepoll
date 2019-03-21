var express = require('express');
var closePoll = require('.././src/Utils/closepoll')

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/closepoll')
  .post(function(req, res, next) {
    console.log("hit route")
    const poll_id = req.body.params.poll_id
    const user_id = req.body.params.user_id

    closePoll.closePoll(poll_id, user_id)
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
