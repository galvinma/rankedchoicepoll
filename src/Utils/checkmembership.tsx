export function checkMembership(a: any, member: any)
{
  let check = false
  for (var i=0; i<a.length; i++)
  {
    if (String(a[i]) === String(member))
    {
      check = true
    }
  }

  return check
}
