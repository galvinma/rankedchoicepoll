var express = require('express');
var checkObjectExistance = require('.././src/Utils/checkobjectexistance')
var appendPollToUser = require('.././src/Utils/appendpolltouser')

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/addpolltouser')
  .post(function(req, res, next) {
    let check = [req.body.params.poll_id, req.body.params.user_id]
    for (var i=0; i<check.length; i++)
    {
      if (checkObjectExistance.checkObjectExistance(check[i]) === false)
      {
        res.json({success: false, message: "Unable to add user to poll"});
        return
      }
    }

    const poll_id = req.body.params.poll_id
    const user_id = req.body.params.user_id

    appendPollToUser.appendPollToUser(poll_id, user_id)
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
