// auth/basic.js

process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import rp from 'request-promise';
import utils from '../../test-utils.js';

const expect = chai.expect;

chai.should();
chai.use(chaiAsPromised);

describe('Create Changeset', function () {

  it('Should respond with a 400 when sent bad xml', function () {
    return rp({
        uri: `${utils.baseApiPath}api/0.6/changeset/create`,
        method: 'PUT',
        sendImmediately: false,
        auth: utils.basicAuthCreds
      })
      .catch(function validateResponseFailure (ex) {
        expect(ex.name).to.equal('StatusCodeError');
        expect(ex.statusCode).to.equal(400);
        expect(ex.message).to.equal('400 - Cannot parse valid changeset from xml string . Must specify a string with one or more characters');
        expect(ex.error).to.equal('Cannot parse valid changeset from xml string . Must specify a string with one or more characters');
      });
  });

  // The docs say this should be a 405 but its responding with a 4040
  it('Should respond with a 404 when hit with a non-PUT method', function () {
    return rp({
        uri: `${utils.baseApiPath}api/0.6/changeset/create`,
        method: 'POST',
        sendImmediately: false,
        auth: utils.basicAuthCreds
      })
      .catch(function validateResponseFailure (ex) {
        expect(ex.name).to.equal('StatusCodeError');
        expect(ex.statusCode).to.equal(404);
      });
  });

  describe('Changeset Id Operations', () => {
    let changesetId;

    before(function (done) {
      const create = '<osm><changeset version="0.6" generator="iD"><tag k="created_by" v="iD 1.8.0"/><tag k="imagery_used" v="Bing"/><tag k="host" v="http://master.apis.dev.openstreetmap.org/id"/><tag k="locale" v="en-US"/><tag k="comment" v="Generating a sample changeset for an api testing framework."/></changeset></osm>';

      rp({
          uri: `${utils.baseApiPath}api/0.6/changeset/create`,
          method: 'PUT',
          sendImmediately: false,
          auth: utils.basicAuthCreds,
          body: create
        })
        .then(function validateResponse (res) {
          changesetId = res;
          done();
        });
    });

    after(function (done) {
      // Using after hook to test close action for now
      rp({
          uri: `${utils.baseApiPath}api/0.6/changeset/${changesetId}/close`,
          method: 'PUT',
          sendImmediately: false,
          auth: utils.basicAuthCreds
        })
        .then(function validateResponse (res) {
          done();
        });
    });

    it('Should respond with a changeset id when sent a valid changeset', function () {
      expect(parseInt(changesetId, 10)).to.be.a('number');
    });

    it('Should respond with a changeset when sent a valid changeset id', function () {
      return rp({
          uri: `${utils.baseApiPath}api/0.6/changeset/${changesetId}?include_discussion=true`,
          method: 'GET',
          sendImmediately: false,
          auth: utils.basicAuthCreds
        })
        .then(utils.parseXml)
        .then(function validateResponse (res) {
          expect(res).to.include.keys('osm');
          expect(res.osm).to.include.keys('changeset');
          expect(res.osm.changeset).to.be.instanceof(Array);
          expect(res.osm.changeset[0]['$'].id).to.equal(changesetId);
          expect(res.osm.changeset[0]['$'].user).to.equal(utils.username);
          expect(res.osm.changeset[0]['$'].open).to.equal('true');
          expect(new Date(res.osm.changeset[0]['$'].created_at).getTime()).to.be.a('number');
          expect(res.osm.changeset[0].tag).to.be.instanceof(Array);
          expect(res.osm.changeset[0].discussion).to.be.instanceof(Array);
          expect(res.osm.changeset[0].tag[0]['$'].k).to.equal('comment');
          expect(res.osm.changeset[0].tag[0]['$'].v).to.equal('Generating a sample changeset for an api testing framework.');
        });
    });

    it('Should respond with a changeset when sent a valid changeset update', function () {
      const update = '<osm><changeset><tag k="comment" v="Just adding an example update."/></changeset></osm>';

      return rp({
          uri: `${utils.baseApiPath}api/0.6/changeset/${changesetId}`,
          method: 'PUT',
          sendImmediately: false,
          auth: utils.basicAuthCreds,
          body: update
        })
        .then(utils.parseXml)
        .then(function validateResponse (res) {
          expect(res).to.include.keys('osm');
          expect(res.osm).to.include.keys('changeset');
          expect(res.osm.changeset).to.be.instanceof(Array);
          expect(res.osm.changeset[0]['$'].id).to.equal(changesetId);
          expect(res.osm.changeset[0]['$'].user).to.equal(utils.username);
          expect(res.osm.changeset[0]['$'].open).to.equal('true');
          expect(new Date(res.osm.changeset[0]['$'].created_at).getTime()).to.be.a('number');
          expect(res.osm.changeset[0].tag).to.be.instanceof(Array);
          expect(res.osm.changeset[0].tag[0]['$'].k).to.equal('comment');
          expect(res.osm.changeset[0].tag[0]['$'].v).to.equal('Just adding an example update.');
        });
    });

  });

});
