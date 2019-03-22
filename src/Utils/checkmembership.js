export function checkMembership(a, member)
{
  let check = false
  for (var i=0; i<a.length; i++)
  {
    if (a[i] !== member)
    {
      check = true
    }
  }

  return check
}
