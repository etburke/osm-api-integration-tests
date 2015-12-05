// // auth/basic.js

// process.env.NODE_ENV = 'test';

// import chai from 'chai';
// import chaiAsPromised from 'chai-as-promised';
// import rp from 'request-promise';
// import utils from '../../test-utils.js';

// const expect = chai.expect;

// chai.should();
// chai.use(chaiAsPromised);

// describe('Create Changeset', function () {
//   // this.timeout(15000);

//   it('Should respond with a 400 when sent bad xml', function () {
//     return rp({
//         uri: utils.baseApiPath + 'api/0.6/changeset/create',
//         method: 'PUT',
//         sendImmediately: false,
//         auth: utils.basicAuthCreds
//       })
//       .catch(function validateResponseFailure (ex) {
//         expect(ex.name).to.equal('StatusCodeError');
//         expect(ex.statusCode).to.equal(400);
//         expect(ex.message).to.equal('400 - Cannot parse valid changeset from xml string . Must specify a string with one or more characters');
//         expect(ex.error).to.equal('Cannot parse valid changeset from xml string . Must specify a string with one or more characters');
//       });
//   });

//   // The docs say this should be a 405 but its responding with a 4040
//   it('Should respond with a 404 when hit with a non-PUT method', function () {
//     return rp({
//         uri: utils.baseApiPath + 'api/0.6/changeset/create',
//         method: 'POST',
//         sendImmediately: false,
//         auth: utils.basicAuthCreds
//       })
//       .catch(function validateResponseFailure (ex) {
//         expect(ex.name).to.equal('StatusCodeError');
//         expect(ex.statusCode).to.equal(404);
//       });
//   });

//   it('Should respond with a changeset id when sent a valid changeset', function () {
//     const create = '<osm><changeset version="0.6" generator="iD"><tag k="created_by" v="iD 1.8.0"/><tag k="imagery_used" v="Bing"/><tag k="host" v="http://master.apis.dev.openstreetmap.org/id"/><tag k="locale" v="en-US"/><tag k="comment" v="Generating a sample changeset for an api testing framework."/></changeset></osm>';

//     return rp({
//         uri: utils.baseApiPath + 'api/0.6/changeset/create',
//         method: 'PUT',
//         sendImmediately: false,
//         auth: utils.basicAuthCreds,
//         body: create
//       })
//       .then(function validateResponse (res) {
//         expect(parseInt(res, 10)).to.be.a('number');
//       });
//   });

//   it('Should respond with a changeset id when sent a valid changeset', function () {
//     const create = '<osm><changeset version="0.6" generator="iD"><tag k="created_by" v="iD 1.8.0"/><tag k="imagery_used" v="Bing"/><tag k="host" v="http://master.apis.dev.openstreetmap.org/id"/><tag k="locale" v="en-US"/><tag k="comment" v="Generating a sample changeset for an api testing framework."/></changeset></osm>';

//     return rp({
//         uri: utils.baseApiPath + 'api/0.6/changeset/create',
//         method: 'PUT',
//         sendImmediately: false,
//         auth: utils.basicAuthCreds,
//         body: create
//       })
//       .then(function validateResponse (res) {
//         expect(parseInt(res, 10)).to.be.a('number');
//       });
//   });

//   const upload = '<osmChange version="0.6" generator="iD"><create><node id="-1" lon="-122.676312098217" lat="45.55735517197004" version="0" changeset="68238"/><node id="-4" lon="-122.676312098217" lat="45.55728568336903" version="0" changeset="68238"/><node id="-7" lon="-122.67614311904907" lat="45.55728192722599" version="0" changeset="68238"/><node id="-10" lon="-122.67614311904907" lat="45.55735705003913" version="0" changeset="68238"/><way id="-1" version="0" changeset="68238"><nd ref="-1"/><nd ref="-4"/><nd ref="-7"/><nd ref="-10"/><nd ref="-1"/><tag k="building" v="house"/><tag k="addr:housenumber" v="4725"/><tag k="addr:street" v="N Mississippi Ave"/><tag k="addr:city" v="Portland"/><tag k="addr:state" v="OR"/><tag k="addr:postcode" v="97217"/><tag k="building:levels" v="3"/></way></create><modify/><delete if-unused="true"/></osmChange>';

// });
