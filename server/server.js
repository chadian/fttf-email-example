'use strict';

const FastBootAppServer = require('fastboot-app-server');
const inlinerMiddleware = require('./lib/inliner-middleware');

const EMBER_ROOT_PATH = '..';

const server = new FastBootAppServer({
  distPath: `${EMBER_ROOT_PATH}/dist`,

  // disable gzip to work with the raw response in the middleware
  gzip: false,

  beforeMiddleware: function(app) {
    app.use(inlinerMiddleware);
  }
});

server.start();