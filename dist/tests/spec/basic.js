'use strict';

define([], function () {
  describe('Example tests', function () {
    it('should pass', function (done) {
      auth.xhr({
        method: 'GET',
        path: '/api/0.6/user/details'
      }, function (err, details) {
        window.xmlRes = details;
        console.log(err, details, details.getElementsByTagName('osm'));
        expect(true).to.equal(true);
        done();
      });
    });
  });
});