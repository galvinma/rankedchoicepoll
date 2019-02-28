var moment = require('moment');

module.exports = {
  checkObjectExistance: function(value)
  {
    if (value === "" || value === null || value === undefined)
    {
      return false
    }
    else
    {
      return true
    }
  }
}
