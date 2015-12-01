'use strict';

define(['spec/testSuite'], function (_testSuite) {
  require.config({
    baseUrl: 'dist/tests',
    urlArgs: 'cb=' + Math.random(),
    paths: {
      spec: 'spec'
    },
    hbs: {
      disableI18n: true
    }
  });

  (function () {
    require(_testSuite.testSuite.specs, function () {
      if (window.auth) {
        if (window.mochaPhantomJS) {
          mochaPhantomJS.run();
        } else {
          mocha.run();
        }
      }
    });
  })();
});