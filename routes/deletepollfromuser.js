var express = require('express');
var checkObjectExistance = require('.././src/Utils/checkobjectexistance')
var removeUserFromPoll = require('.././src/Utils/removeuserfrompoll')
var removePollFromUser = require('.././src/Utils/removepollfromuser')

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/deletepollfromuser')
  .post(function(req, res, next) {
    let check = [req.body.params.poll_id, req.body.params.user_id]
    for (var i=0; i<check.length; i++)
    {
      if (checkObjectExistance.checkObjectExistance(check[i]) === false)
      {
        res.json({success: false, message: "Unable to remove user from poll"});
        return
      }
    }

    const poll_id = req.body.params.poll_id
    const user_id = req.body.params.user_id

    removeUserFromPoll.removeUserFromPoll(poll_id, user_id)
    .then((response) => {
      removePollFromUser.removePollFromUser(poll_id, user_id)
      .then((userResponse) => {
        res.json(userResponse)
        return
      })
      .catch((userError) => {
        res.json(userError)
        return
      })
    })
    .catch((error) => {
      res.json(error)
      return
    })
  })

module.exports = router;
