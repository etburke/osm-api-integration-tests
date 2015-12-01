import xml2js from 'xml2js';

export default function parseXml (xml) {
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