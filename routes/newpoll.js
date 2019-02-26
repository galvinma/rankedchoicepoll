var express = require('express');
var createNewPoll = require('.././src/Utils/createnewpoll')

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/newpoll')
  .post(function(req, res, next) {
    const pollResponse = createNewPoll.createNewPoll(req)
    res.json(pollResponse)
    return
  });

module.exports = router;
