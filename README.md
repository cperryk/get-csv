A super-simple package that fetches a CSV file and parses its data into an object in one function.

## Example ##

data.csv:

```
foo,bar
one,two
```

compile.js:

```
const getCSV = require('get-csv');
getCSV('data.csv')
  .then(rows => console.log(rows));
```

`data` will log as `[{foo: "one", bar: "two"}]`.

You can pass a URL instead of a file path:

```
getCSV('http://www.path.to.my.doc.csv')
  .then(rows => /* some JS */);
```

You can also pass a stream:

```
getCSV(fs.createReadStream('data.csv'))
  .then(rows => /* some JS */);
```

## Options ##

You can pass [fast-csv parsing options](https://github.com/C2FO/fast-csv#parsing) as the second argument.

The `headers` option defaults to `true` when using `getCSV`, but you can override this by explicitly setting it `false` in the options argument. Like so:

```
getCSV('data.csv', {headers: false})
  .then(rows => console.log(rows));
```

Here, `rows` will log as `[['foo','bar'],['one','two']]`.

## Callbacks ##

getCSV also supports old-fashioned callbacks. Example:

```
getCSV('test.csv', function(err, data){
  /* some JS */
});
```
