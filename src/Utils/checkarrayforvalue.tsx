export function checkArrayForValue(a: any, value: any)
{
  let ret = false
  for (var i=0; i<a.length; i++)
  {
    if (String(a[i]).toUpperCase() === String(value).toUpperCase())
    {
      ret = true
    }
  }
  return ret
}
