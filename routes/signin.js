var express = require('express');
var Users = require('.././model/users');
var signInUser = require('.././src/Utils/signinuser')

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/signin')
  .post(function(req, res, next) {
      Users.findOne({ email: req.body.params.email }).lean().exec(function(err, user) {
        if (err)
        {
          res.json({allow: false});
          return
        }

        if (user === null ||
            user === undefined ||
            user.password === null ||
            req.body.params.password === null ||
            req.body.params.password === undefined ||
            req.body.params.password === "")
        {
          res.json({allow: false});
          return
        }

        signInUser.signInUser(req, user)
        .then((signInResponse) => {
          res.json(signInResponse)
          return
        })
        .catch((error)=>{
          res.json({allow: false});
          return
        });
      });
  });

module.exports = router;
