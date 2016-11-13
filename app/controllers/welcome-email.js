import Ember from 'ember';
import config from 'fttf-email/config/environment';

export default Ember.Controller.extend({
  fastboot: Ember.inject.service(),

  queryParams: ['toName', 'toEmail', 'fromEmail', 'subject'],
  toName: null,
  toEmail: null,
  fromEmail: null,
  subject: null,

  learnMoreUrl: Ember.computed(function() {
    const fastboot = this.get('fastboot');
    let url = config.APP.fttfGithubUrl;

    if (fastboot.get('isFastBoot')) {
      // FastBoot is a global avaliable when running in 'FastBoot' mode
      url = Ember.get(FastBoot.require('process'), 'env.FTTF_GITHUB_URL') || url;
    }

    return url;
  }),

  addDispatchParamsToResponse: Ember.on('init', function() {
    Ember.run.schedule('routerTransitions', this, function() {
      const isFastBoot = this.get('fastboot.isFastBoot');

      if (isFastBoot) {
        const resHeaders = this.get('fastboot.response.headers');
        resHeaders.set('to-email', this.get('toEmail'));
        resHeaders.set('subject', this.get('fromEmail'));
      }
    });
  })
});
