# ng-templatecache

Convert Angular templates to $templateCache entries.

## Installation

```
npm install --save ng-templatecache
```

## Usage

```js
var templatecacheRender = require('ng-templatecache');
var myTemplate = '<div>Hello, {{firstName}}</div>';

console.log(templatecacheRender({
  entries: [{content: myTemplate, path: '/templates/greet.html'}],
  module: 'templates'
}));
```

Results in the following output:

```js
angular.module('templates').run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/greet.html', '<div>Hello, {{firstName}}</div>');
}]);
```

## Options

- `entries` The list of entries to be added to the cache, each containing `path` and `content`
- `module` (default: `"templates"`) sets the generate module name. `false` means don't create a module
- `prefix` (default: `''`) Prefix to add to template paths
- `standalone` (default: `false`) if `true`, the module will be created as `angular.module('xxx', [])`
