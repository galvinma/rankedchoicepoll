export function checkArrayForValue(a, value)
{
  let ret = false
  for (var i=0; i<a.length; i++)
  {
    if (a[i] === value)
    {
      ret = true
    }
  }
  return ret
}
