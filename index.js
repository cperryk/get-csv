const fs = require('fs'),
  csv = require('fast-csv'),
  request = require('request'),
  isUrl = require('is-url'),
  _ = require('lodash'),
  isStream = require('is-stream');

/**
 * Return a stream from a source.
 * @param  {String} src - File path, URL, or stream.
 * @return {Object} - A stream
 */
function resolveSrc(src) {
  if (isUrl(src)) {
    return request(src);
  }
  if (isStream(src)) {
    return src;
  }
  return fs.createReadStream(src);
}


function getCSV(src, opts, callback) {
  if (typeof opts === 'function' && callback === undefined) {
    callback = opts;
    opts = {};
  }
  return new Promise((resolve, reject)=>{
    const csvOpts = _.defaults(opts, {headers: true}),
      out = [],
      csvStream = csv(csvOpts)
        .on('data', data => out.push(data))
        .on('end', () => {
          if (callback) callback(null, out);
          resolve(out);
        })
        .on('error', (err) => {
          if (callback) callback(err);
          reject(err);
        });

    resolveSrc(src).pipe(csvStream);
  });
}

module.exports = getCSV;
