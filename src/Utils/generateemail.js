var moment = require('moment');

module.exports = {
  generateEmail: function()
  {
    const epochtime = moment().unix()
    const email = String(epochtime)+"@test.com"
    return email
  }
}
