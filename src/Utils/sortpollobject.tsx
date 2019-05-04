export function sortPollObject(results: any)
{
    var keys: any = [];
    var sorted: any = {};

    for (var key in results)
    {
      if (results.hasOwnProperty(key))
      {
          keys.push(key);
      }
    }

    keys.sort()
    keys.forEach((key: any) => {
        sorted[key] = results[key];
    });

    return sorted;
};
