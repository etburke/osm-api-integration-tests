// auth/basic.js

process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import rp from 'request-promise';
import xml2js from 'xml2js';

const config = require('../../config.json');
const expect = chai.expect;
const parseString = function parseString (xml) {
  return new Promise(function (resolve, reject) {
    xml2js.parseString(xml, function (err, result) {
      if (err) {
        reject(err);
      }
      else {
        resolve(result);
      }
    });
  });
}

chai.should();
chai.use(chaiAsPromised);

describe('Basic HTTP Authentication', function () {
  // this.timeout(15000);

  it('Should get permissions for a valid user', function () {
    return rp({
        uri: config.baseApiPath + 'api/0.6/permissions',
        method: 'GET',
        sendImmediately: false,
        auth: {
          user: config.email,
          pass: config.password
        }
      })
      .then(parseString)
      .then(function validateResponse (res) {
        expect(res).to.include.keys('osm');
        expect(res.osm).to.include.keys('permissions');
        expect(res.osm.permissions).to.be.instanceof(Array);
        expect(res.osm.permissions[0].permission).to.be.instanceof(Array);
        expect(res.osm.permissions[0].permission[0]['$'].name).to.equal('allow_read_prefs');
        expect(res.osm.permissions[0].permission[1]['$'].name).to.equal('allow_write_prefs');
        expect(res.osm.permissions[0].permission[2]['$'].name).to.equal('allow_write_diary');
        expect(res.osm.permissions[0].permission[3]['$'].name).to.equal('allow_write_api');
        expect(res.osm.permissions[0].permission[4]['$'].name).to.equal('allow_read_gpx');
        expect(res.osm.permissions[0].permission[5]['$'].name).to.equal('allow_write_gpx');
        expect(res.osm.permissions[0].permission[6]['$'].name).to.equal('allow_write_notes');
      });
  });

});