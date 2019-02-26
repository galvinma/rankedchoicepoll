var passJWT = require('./passreset');

module.exports = {
  resetUserPassword: function(req)
  {
    Users.findOne({ email: req.body.params.email.toUpperCase() }).lean().exec(function(err, user)
    {
      if (err)
      {
        return { success: false, message: "Unable to find user's email"}
      }

      if (user === null || req.body.params.email === null || req.body.params.email === "" || req.body.params.email === undefined)
      {
        return { success: false, message: "Missing required parameters"}
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
        viewEngine: 'handlebars',
        viewPath: './templates/',
        extName: '.html'
      }

      smtpTransport.use('compile', hbs(handlebarsOptions));

      var data =
      {
        to: req.body.params.email,
        from: email,
        template: 'resetPassword',
        subject: 'Daisy Journal - Password Reset',
        context: {
          link: 'daisyjournal.com/resetpassword/'+user.id+'/'+token,
          firstname: user.firstname
        }
      }

      smtpTransport.sendMail(data, function(err)
      {
        if (!err)
        {
          return { success: true, message: "Successfully reset password" }
        }
        else
        {
          return { success: false, message: "Unable to send confirmation email"}
        }
      })
    })
  }
}
