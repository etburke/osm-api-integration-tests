// auth/basic.js

process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import rp from 'request-promise';
import utils from '../../test-utils.js';

const expect = chai.expect;

chai.should();
chai.use(chaiAsPromised);

describe('Map', function () {

  it('Should get capabilities', function () {
    return rp({
        uri: `${utils.baseApiPath}api/capabilities`,
        method: 'GET',
        sendImmediately: false,
        auth: utils.basicAuthCreds
      })
      .then(utils.parseXml)
      .then(function validateResponse (res) {
        expect(res).to.include.keys('osm');
        expect(res.osm).to.include.keys('$');
        expect(res.osm).to.include.keys('api');
        expect(res.osm).to.include.keys('policy');
        expect(res.osm.api).to.be.instanceof(Array);
        expect(res.osm.policy).to.be.instanceof(Array);
        expect(res.osm.api[0].version[0]['$'].minimum).to.equal('0.6');
        expect(res.osm.api[0].version[0]['$'].maximum).to.equal('0.6');
        expect(res.osm.api[0].area[0]['$'].maximum).to.equal('0.25');
        expect(res.osm.api[0].tracepoints[0]['$'].per_page).to.equal('5000');
        expect(res.osm.api[0].waynodes[0]['$'].maximum).to.equal('2000');
        expect(res.osm.api[0].changesets[0]['$'].maximum_elements).to.equal('50000');
        expect(res.osm.api[0].timeout[0]['$'].seconds).to.equal('300');
        expect(res.osm.api[0].status[0]['$'].database).to.equal('online');
        expect(res.osm.api[0].status[0]['$'].api).to.equal('online');
        expect(res.osm.api[0].status[0]['$'].gpx).to.equal('online');
      });
  });

  it('Should get map data', function () {
    // TODO: Run this test after uploading a changeset
    //       Check for validity based on the uploaded changeset
    const bounds = { 
      minlat: '45.557243121819475',
      minlon: '-122.67635034344198',
      maxlat: '45.55738397710899',
      maxlon: '-122.67608212254049'
    };

    return rp({
        uri: `${utils.baseApiPath}api/0.6/map?bbox=${bounds.minlon},${bounds.minlat},${bounds.maxlon},${bounds.maxlat}`,
        method: 'GET',
        sendImmediately: false,
        auth: utils.basicAuthCreds
      })
      .then(utils.parseXml)
      .then(function validateResponse (res) {
        expect(res).to.include.keys('osm');
        expect(res.osm).to.include.keys('$');

        expect(res.osm).to.include.keys('bounds');
        expect(res.osm.bounds).to.be.instanceof(Array);
        expect(res.osm.bounds[0]['$'].minlon).to.equal(bounds.minlon);
        expect(res.osm.bounds[0]['$'].minlat).to.equal(bounds.minlat);
        expect(res.osm.bounds[0]['$'].maxlon).to.equal(bounds.maxlon);
        expect(res.osm.bounds[0]['$'].maxlat).to.equal(bounds.maxlat);
        
        const node0 = {
          id: '4301026677',
          changeset: '68260',
          timestamp: '2015-12-05T20:22:07Z',
          version: '1',
          visible: 'true',
          user: 'Thomas Burke',
          uid: '3455',
          lat: '45.5572984',
          lon: '-122.6761431'
        };

        expect(res.osm).to.include.keys('node');
        expect(res.osm.node).to.be.instanceof(Array);
        expect(res.osm.node[0]['$']).to.eql(node0);

        const way0 = {
          id: '4298942067',
          changeset: '68260',
          timestamp: '2015-12-05T20:22:07Z',
          version: '2',
          visible: 'true',
          user: 'Thomas Burke',
          uid: '3455'
        };

        expect(res.osm).to.include.keys('way');
        expect(res.osm.way).to.be.instanceof(Array);
        expect(res.osm.way[0]['$']).to.eql(way0);
      });
  });

});