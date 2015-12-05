import xml2js from 'xml2js';

const { baseApiPath, basicAuthCreds, username } = require('./config.json');

const parseXml = function parseXml (xml) {
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

export default { baseApiPath, basicAuthCreds, username, parseXml }