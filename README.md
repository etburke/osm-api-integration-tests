# osm-api-integration-tests
Mocha tests for the Open Street Map API

This project is meant to help when developing APIs that mimick the official OSM "Rails Port" API. 

First, you'll need node and npm. Visit [nodejs.org](https://nodejs.org/) to get started.

Next, you'll need [mocha](https://mochajs.org/) and [gulp](http://gulpjs.com/). Both should be installed globally.
```
npm install mocha gulp -g
```
Now install the project's dependencies.
```
npm install
```
The project is configured by default to run against the official master development deployment at http://master.apis.dev.openstreetmap.org/. You'll need to create an account on this deployment to run these tests. Once you've created an account copy the config.example.json to config.json
```
cp config.example.json config.json
```
and update the email and password values with your own. This new file will be ignored by git.
