'use strict';

const interceptor = require('express-interceptor');
const juice = require('juice');
const fs = require('fs');

const CSS_PATH = '../dist/assets/';
const vendorCss = fs.readFileSync(CSS_PATH + 'vendor.css').toString();
const emailCss = fs.readFileSync(CSS_PATH + 'fttf-email.css').toString();

module.exports = interceptor(function(req, res){
  return {
    isInterceptable: function() {
      const hasHtmlContentType = /text\/html/.test(res.get('Content-Type'));
      const hasRenderEndingRoute = req.originalUrl.endsWith('/render');

      return hasHtmlContentType && hasRenderEndingRoute;
    },
    intercept: function(body, send) {
      const inlined = juice.inlineContent(body, vendorCss + emailCss);
      send(inlined);
    }
  };
});