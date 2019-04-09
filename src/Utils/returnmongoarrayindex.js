module.exports = {
  returnMongoArrayIndex: function(a, val)
  {
    let ind = -1
    for (var i=0; i<a.length; i++)
    {
      if (String(a[i]) === String(val))
      {
        ind = i
        break
      }
    }
    return ind
  }
}
