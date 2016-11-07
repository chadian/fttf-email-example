import Ember from 'ember';
import config from 'fttf-email/config/environment';

export default Ember.Controller.extend({
  fastboot: Ember.inject.service(),
  learnMoreUrl: Ember.computed(function() {
    const fastboot = this.get('fastboot');
    let url = config.APP.fttfGithubUrl;

    console.log(config.APP.fttfGithubUrl);

    if (fastboot.get('isFastBoot')) {
      // FastBoot is a global avaliable when running in 'FastBoot' mode
      url = Ember.get(FastBoot.require('process'), 'env.FTTF_GITHUB_URL') || url;
    }

    return url;
  })
});
