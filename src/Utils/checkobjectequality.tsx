function pushKeys(c: any)
{
  var keys: any = [];
  for (var key in c)
  {
    if (c.hasOwnProperty(key))
    {
      keys.push(key);
    }
  }
  return keys
}

export function checkObjectEquality(a: any, b: any)
{
  let a_keys: any = pushKeys(a)
  let b_keys: any = pushKeys(b)

  if (a_keys.length !== b_keys.length)
  {
    return false
  }

  for (var i=0; i<a_keys.length; i++)
  {
    let item = a[i]

    if (a[item] !== b[item])
    {
      return false
    }
  }

  return true
}
