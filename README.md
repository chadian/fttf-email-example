# FastBoot to the Future ⚡️ Email Example

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with Yarn)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `yarn`
* `bower install`
* change into `fastboot-server` directory
* `yarn`

## Running / Development

### Building UI and Components Locally
* `ember build`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running node server
# Build first via `ember build`
* change directory into `fastboot-server`
* Ensure `config.js` exists with proper values. See `config.js.example` for example.
* `node server`
* express actions on different routes, ie: `welcome-email` route
  * `/welcome-email` for regular ember rendering
  * `/welcome-email/render` to see rendered with inlined-css
  * `/welcome-email/dispatch` see dispatch email

The `fastboot-server/server.js` is specically ran from within the folder, and expects to be able to find the `..dist` folder for css resources. Based on `/render` or `/dispatch` routes different actions are taken within the `interceptor-middleware.js` express middleware.

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

