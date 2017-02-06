const getCSV = require('./index'),
  expect = require('chai').expect,
  fs = require('fs'),
  TEST_URL = 'https://docs.google.com/spreadsheets/d/1fjvn5HZpyIM-R4TTgg17Ze4sHfWbri2y2I0VP1B0lv0/pub?output=csv',
  MOCK_RESULT = [
    {
      foo: '1',
      bar: '2',
      baz: '3'
    },
    {
      foo: 'one, two',
      bar: 'three',
      baz: 'four'
    }
  ],
  MOCK_RESULT_NO_HEADERS = [['foo','bar','baz'],['1','2','3'],['one, two','three','four']];

describe('getCSV', function () {
  it('Fetches a local file', function (done) {
    getCSV('test.csv')
      .then(result => {
        expect(result).to.deep.equal(MOCK_RESULT);
        done();
      });
  });
  it('Fetches a Google Spreadsheet URL', function (done) {
    getCSV(TEST_URL)
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
  it('Supports fast-csv options', function (done) {
    getCSV(fs.createReadStream('test.csv'), {headers: false})
      .then((result)=>{
        expect(result).to.deep.equal(MOCK_RESULT_NO_HEADERS);
        done();
      });
  });
  it('Supports options with callback', function (done) {
    getCSV(fs.createReadStream('test.csv'), {headers: false}, (err, rows)=>{
      expect(err).to.equal(null);
      expect(rows).to.deep.equal(MOCK_RESULT_NO_HEADERS);
      done();
    });
  });
  it('Rejects promise if src is not found', function (done) {
    getCSV('a-path-to-nowhere.csv')
      .then(result => done('Function was supposed to throw error but resolved with ', result))
      .catch((err) => {
        expect(err).to.be.ok;
        done();
      });
  });
});
