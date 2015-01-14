# ng-templatecache

Convert Angular templates to $templateCache entries.

## Installation

```
npm install --save ng-templatecache
```

## Usage

```js
var templatecache = require('templatecache');
var myTemplate = '<div>Hello, {{firstName}}</div>';
templatecache.render(myTemplate, '/templates/greet.html', {
  module: 'templates'
});
```

Results in

```js
angular.module('templates').run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/greet.html', '<div>Hello, {{firstName}}</div>');
}]);
```
