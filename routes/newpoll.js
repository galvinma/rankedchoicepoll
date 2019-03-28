var express = require('express');
var createNewPoll = require('.././src/Utils/createnewpoll')
var checkObjectExistance = require('.././src/Utils/checkobjectexistance')
var joinUserOnlyEmail = require('.././src/Utils/joinuseronlyemail')
var getUserIdFromEmail = require('.././src/Utils/getuseridfromemail')
var prepMembers = require('.././src/Utils/prepmembers')

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/newpoll')
  .post(async function(req, res, next) {

    let check = [req.body.params.admin_id, req.body.params.options, req.body.params.poll_items, req.body.params.title]
    for (var i=0; i<check.length; i++)
    {
      if (checkObjectExistance.checkObjectExistance(check[i]) === false)
      {
        res.json({allow: false, message: "Missing required parameters"});
        return
      }
    }

    // Get object IDs from supplied emails.
    let members
    try
    {
      members = await prepMembers.prepMembers(req.body.params.members)
    }
    catch (error)
    {
      return
    }
    members.push(req.body.params.admin_id)

    const admin_id = req.body.params.admin_id
    const options = req.body.params.options
    const poll_items = req.body.params.poll_items
    const title = req.body.params.title

    // Crate new poll using member IDs
    pollResponse = await createNewPoll.createNewPoll(admin_id, options, poll_items, title, members)
    res.json(pollResponse)
    return
  });

module.exports = router;
