import templatecache from '../src';

export const withDefaults = {
  setUp(done) {
    this.template = '<div>Hello, {{firstName}}</div>';
    this.result = templatecache({src: this.template, srcPath: 'templates/greet'});
    done();
  },

  putsTemplateInCache(test) {
    test.ok(this.result.includes(this.template), 'Missing original template');
    test.ok(this.result.includes('$templateCache.put'), 'Missing $templateCache.put');
    test.done();
  },

  wrapsInModule(test) {
    test.ok(this.result.includes('angular.module'), 'Missing angular.module');
    test.ok(this.result.match(/\}\]\);$/), 'Missing module closing');
    test.done();
  }

};

export const withOpts = {

}
