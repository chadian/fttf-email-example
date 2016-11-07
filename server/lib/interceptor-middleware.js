'use strict';

const interceptor = require('express-interceptor');
const juice = require('juice');
const fs = require('fs');
const mailgun = require('mailgun-js');
const cheerio = require('cheerio');

const CSS_PATH = '../dist/assets/';
const vendorCss = fs.readFileSync(CSS_PATH + 'vendor.css');
const emailCss = fs.readFileSync(CSS_PATH + 'fttf-email.css');

module.exports = function middleware({ mailgunApiKey, mailgunDomain }) {
  return interceptor(function(req, res) {
    const isRenderRoute = req.originalUrl.endsWith('/render');
    const isDispatchRoute = req.originalUrl.endsWith('/dispatch');

    return {
      isInterceptable: function() {
        const hasHtmlContentType = /text\/html/.test(res.get('Content-Type'));
        const needsRendering = isRenderRoute || isDispatchRoute;

        return hasHtmlContentType && needsRendering;
      },
      intercept: function(body, send) {
        const emailPrepQueue = inlineStyles(body)
          .then(cleanScripts);

        if (isDispatchRoute) {
          emailPrepQueue.then(cleaned => dispatchEmail({
            mailgunApiKey,
            mailgunDomain,
            body: cleaned
          }));
        }

        emailPrepQueue
          .then(send)
          .catch(send);
      }
    };
  });
};

function inlineStyles(body) {
  const cssContent = vendorCss.toString() + emailCss.toString();
  const inlined = juice.inlineContent(body, cssContent);
  return Promise.resolve(inlined);
}

function cleanScripts(body) {
  const $ = cheerio.load(body);
  $('script').remove();

  return Promise.resolve($.html());
}

function dispatchEmail({ apiKey, domain, body }) {
  const dispatcher = mailgun({ apiKey, domain });

  const $ = cheerio.load(body);
  const data = {
    from: 'chadcarbert@me.com',
    to: 'chadcarbert@me.com',
    subject: 'Hello',
    text: $.text(),
    html: $.html()
  };

  return new Promise(function(resolve, reject) {
    dispatcher.messages().send(data, function(err, response) {
      if (err) {
        reject(err);
      } else {
        console.info('## Message sent', data);
        resolve(body);
      }
    });
  });
}
