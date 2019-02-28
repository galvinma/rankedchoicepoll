var express = require('express');
var createNewPoll = require('.././src/Utils/createnewpoll')
var checkObjectExistance = require('.././src/Utils/checkobjectexistance')

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/newpoll')
  .post(function(req, res, next) {

    let check = [req.body.params.admin_id, req.body.params.options, req.body.params.poll_items, req.body.params.title]
    for (var i=0; i<check.length; i++)
    {
      if (checkObjectExistance.checkObjectExistance(check[i]) === false)
      {
        res.json({allow: false, message: "Missing required parameters"});
        return
      }
    }

    const admin_id = req.body.params.admin_id
    const options = req.body.params.options
    const poll_items = req.body.params.poll_items
    const title = req.body.params.title
    const pollResponse = createNewPoll.createNewPoll(admin_id, options, poll_items, title)
    res.json(pollResponse)
    return
  });

module.exports = router;
