var express = require('express');
var jwt = require('jsonwebtoken');
var Users = require('.././model/users');

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/checktoken')
  .post(function(req, res, next) {
    var token = req.body.params.token
    var user_id = req.body.params.user

    jwt.verify(token, process.env.REACT_APP_JWT_SECRET, function(err, decoded) {
      if (err)
      {
        return res.json({
          allow: false,
          user: null,
          token: null,
        })
      }
      Users.findOne({ id: user_id }).lean().exec(function(err, user) {
        if (err)
        {
          res.json({
            allow: false,
            user: null,
            token: null,
          });
          return
        }

        // Check for blanks and invalid input
        if (user === null || user === "")
        {
          res.json({
            allow: false,
            user: null,
            token: null,
          });
          return
        }

        if (req.body.params.user === null || req.body.params.user === "" ||
            req.body.params.token === null || req.body.params.token === "")
        {
          res.json({
            allow: false,
            user: null,
            token: null,
          });
          return
        }
        if (String(decoded.id) !== String(user.id) ||
            decoded.reset_count !== user.reset_count ||
            decoded.join_date !== user.join_date)
        {
          res.json({
            allow: false,
            user: null,
            token: null,
          });
          return
        }
        else
        {
          res.json({
              allow: true,
              user: user,
              token: token,
          });
        }
      })
    })
  })

module.exports = router;
