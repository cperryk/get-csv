A super-simple package that fetches a CSV file and parses its data into an object in one function.

## Example ##

data.csv:
```
  foo, bar
  1, 2
```

compile.js:
```
  var getCSV = require('get-csv');
  getCSV('data.csv', function(err, data){
    console.log(data);
  });
```

`data` will log as `{foo: 1, bar: 2}`.

You can pass a URL instead of a file path:
```
  getCSV('http://www.path.to.my.doc.csv', function(err, data){
    console.log(data);
  });
```

## Options ##

You can pass [fast-csv parsing options](https://github.com/C2FO/fast-csv#parsing) as the second argument and leave the callback for the third argument. Note that this completely overwrites the default parsing options, so the `headers` option will be `false` unless you explicitly set it to `true` again.

## Bonus! ##

getCSV is a promise-returning function. Example:

```
getCSV('test.csv')
  .then(function(data){
    console.log(data);
  });
```
