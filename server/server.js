'use strict';

const FastBootAppServer = require('fastboot-app-server');
const EMBER_ROOT_PATH = '..';

let server = new FastBootAppServer({
  distPath: `${EMBER_ROOT_PATH}/dist`,
  gzip: true // Optional - Enables gzip compression.
});

server.start();