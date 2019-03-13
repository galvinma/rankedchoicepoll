var moment = require('moment');

module.exports = {
  generateEmail: function()
  {
    const epochtime = moment().unix()
    const randomNum = Math.random()
    const email = String(epochtime)+randomNum+"@test.com"
    return email
  }
}
