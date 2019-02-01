var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Users = require('.././model/users');
var passJWT = require('.././src/Utils/passreset');

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/reset')
  .post(function(req, res, next) {

    // Check if user's email exists!!!!!
    Users.findOne({ email: req.body.params.email.toUpperCase() }).lean().exec(function(err, user) {
      if (err)
      {
        res.json({
            success: false,
        });
        return
      }

      if (user === null || req.body.params.email === null || req.body.params.email === "")
      {
        res.json({
            allow: false,
        });
        return
      }

    // create token
    var token = passJWT.passJWT(user)

    var  hbs = require('nodemailer-express-handlebars'),
    email = process.env.REACT_APP_MAILER_EMAIL_ID
    pass = process.env.REACT_APP_MAILER_PASSWORD
    nodemailer = require('nodemailer');

    var smtpTransport = nodemailer.createTransport({
      service: process.env.REACT_APP_MAILER_SERVICE_PROVIDER,
      auth: {
        user: email,
        pass: pass
      }
    });

    var handlebarsOptions = {
      viewEngine: 'handlebars',
      viewPath: './templates/',
      extName: '.html'
    };

    smtpTransport.use('compile', hbs(handlebarsOptions));

    var data = {
        to: req.body.params.email,
        from: email,
        template: 'resetPassword',
        subject: 'Daisy Journal - Password Reset',
        context: {
          link: 'daisyjournal.com/resetpassword/'+user.id+'/'+token,
          firstname: user.firstname
        }
      };

    smtpTransport.sendMail(data, function(err) {
      if (!err) {
        return res.json({ success: true });
      } else {
        return done(err);
      }

    })
  })
})
module.exports = router;
