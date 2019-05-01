var passJWT = require('./passreset');
var User = require('../.././model/users');

module.exports = {
  resetUserPassword: function(req)
  {
    return new Promise((resolve, reject) => {
      User.findOne({ email: req.body.params.email.toUpperCase() }).lean().exec(function(err, user)
      {
        if (err || user === null)
        {
          return resolve({ success: false, message: "Unable to find email"})
        }

        if (req.body.params.email === null || req.body.params.email === "" || req.body.params.email === undefined)
        {
          return resolve({ success: false, message: "Missing required parameters"})
        }

        var token = passJWT.passJWT(user)
        var hbs = require('nodemailer-express-handlebars')
        email = process.env.REACT_APP_MAILER_EMAIL_ID
        pass = process.env.REACT_APP_MAILER_PASSWORD
        nodemailer = require('nodemailer');

        var smtpTransport = nodemailer.createTransport({
          service: process.env.REACT_APP_MAILER_SERVICE_PROVIDER,
          auth: {
            user: email,
            pass: pass
          }
        })

        var handlebarsOptions =
        {
          viewEngine: {
            extName: '.html',
            partialsDir: './templates/',
          },
          viewPath: './templates/',
          extName: '.html'
        }

        smtpTransport.use('compile', hbs(handlebarsOptions));

        var data =
        {
          to: req.body.params.email,
          from: email,
          template: 'resetPassword',
          subject: 'Ranked Choice Poll - Password Reset',
          context: {
            link: 'rankedchoicepoll.com/resetpassword/'+user.id+'/'+token,
            firstname: user.firstname
          }
        }

        smtpTransport.sendMail(data, function(err)
        {
          if (!err)
          {
            return resolve({ success: true, message: "Please check your email." })
          }
          else
          {
            return resolve({ success: false, message: "Unable to send confirmation email."})
          }
        })
      })
    })
  }
}
