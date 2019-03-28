var express = require('express');
var returnUserPolls = require('.././src/Utils/returnuserpolls')
var ObjectId = require('mongodb').ObjectID;
var Poll = require('.././model/poll');

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/returnuserpolls')
  .post(async function(req, res, next) {

    if (req.body.params.user_id === 'null')
    {
      return
    }
    else
    {
      let retUserResponse
      try
      {
        retUserResponse = await returnUserPolls.returnUserPolls(req)
        res.json(retUserResponse)
        return
      }
      catch (error)
      {
        console.log(error)
        res.json(error)
        return
      }
    }
  });

module.exports = router;
