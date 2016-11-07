import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('welcome-email', function() {
    this.route('render');
    this.route('dispatch');
  });
});

export default Router;
