const getCSV = require('./index'),
  expect = require('chai').expect,
  fs = require('fs'),
  MOCK_RESULT = [
    {
      foo: '1',
      bar: '2',
      baz: '3'
    }
  ];

describe('getCSV', function () {
  it('Fetches a local file', function (done) {
    getCSV('test.csv')
      .then(result => {
        expect(result).to.deep.equal(MOCK_RESULT);
        done();
      })
      .catch((err)=>{
        console.log('err', err);
      });
  });
  it('Fetches a Google Spreadsheet URL', function (done) {
    getCSV('https://docs.google.com/spreadsheets/d/1fjvn5HZpyIM-R4TTgg17Ze4sHfWbri2y2I0VP1B0lv0/pub?output=csv')
      .then(result => {
        expect(result).to.deep.equal(MOCK_RESULT);
        done();
      });
  });
  it('Processes a read stream correctly', function (done) {
    getCSV(fs.createReadStream('test.csv'))
      .then(result => {
        expect(result).to.deep.equal(MOCK_RESULT);
        done();
      });
  });
  it('Allows callbacks instead of promises', function (done) {
    getCSV(fs.createReadStream('test.csv'), (err, result) => {
      expect(result).to.deep.equal(MOCK_RESULT);
      expect(err).to.equal(null);
      done();
    });
  });
});
