var fs = require('fs');
var csv = require('fast-csv');
var request = require('request');

function getCSV(file_path, opts, callback){

  if(typeof opts === 'function' && callback === undefined){
    callback = opts;
    opts = null;
  }
  return new Promise(function(resolve, reject){
    var out = [];
    var stream;
    fs.stat(file_path, function(err, data){
      console.log(data);
      stream = data ? fs.createReadStream(file_path) : request(file_path);
      var csv_opts = opts ? opts : {headers:true};
      var csvStream = csv(csv_opts)
        .on("data", function(data){
          out.push(data);
        })
        .on("end", function(){
          if(callback){
            callback(null, out);
          }
          resolve(out);
        })
        .on("error", function(err){
          if(callback){
            callback(err);
          }
          reject(err);
        });
      stream.pipe(csvStream);
    });
  });
}

function isUrl(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}

module.exports = getCSV;
