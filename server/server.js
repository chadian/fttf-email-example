'use strict';

const config = require('./config');
const FastBootAppServer = require('fastboot-app-server');
const interceptorMiddleware = require('./lib/interceptor-middleware')({
  mailgunApiKey: config.mailgunApiKey,
  mailgunDomain: config.mailgunDomain
});

const EMBER_ROOT_PATH = '..';

const server = new FastBootAppServer({
  distPath: `${EMBER_ROOT_PATH}/dist`,

  // disable gzip to work with the raw response in the middleware
  gzip: false,

  beforeMiddleware: function(app) {
    app.use(interceptorMiddleware);
  }
});

server.start();
