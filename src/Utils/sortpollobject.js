export function sortPollObject(results)
{
    var keys = [];
    var sorted = {};
    
    for (var key in results)
    {
      if (results.hasOwnProperty(key))
      {
          keys.push(key);
      }
    }

    keys.sort()
    keys.forEach((key) => {
        sorted[key] = results[key];
    });

    return sorted;
};
