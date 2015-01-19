import templatecache from '../src';

export const withDefaults = {
  setUp(done) {
    this.template = '<div>Hello, {{firstName}}</div>';
    this.result = templatecache({entries: [{src: this.template, srcPath: 'a/b'}]});
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
  },

  escapesTemplatesForJavascript(test) {
    const template = 'Break"';
    const result = templatecache({entries: [{src: template, srcPath: 'a/b'}], module: false});
    test.equal(result, '$templateCache.put("a/b", "Break\\"");');
    test.done();
  },

  oneLinePerEntry(test) {
    const result = templatecache({entries: [
      {src: 'abc', srcPath: 'a/b'},
      {src: 'def', srcPath: 'a/c'},
      {src: 'ghi', srcPath: 'a/c'},
    ]});
    test.equal(result.match(/templateCache.put/g).length, 3);
    test.done();
  }
};

export const withOptions = {
  setUp(done) {
    this.template = '<div>Hello, {{firstName}}</div>';
    done();
  },

  customModule(test) {
    const result = templatecache({entries: [{src: this.template, srcPath: 'a/b'}], module: 'cake'});
    test.ok(result.includes('angular.module("cake")'));
    test.done();
  },

  standalone(test) {
    const result = templatecache({entries: [{src: this.template, srcPath: 'a/b'}], standalone: true});
    test.ok(result.includes('angular.module("templates", [])'));
    test.done();
  },

  noModule(test) {
    const result = templatecache({entries: [{src: this.template, srcPath: 'a/b'}], module: false});
    test.ok(!result.includes('angular.module'));
    test.done();
  }
};
