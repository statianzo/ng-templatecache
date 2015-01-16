import escape from 'js-string-escape';
import {format} from 'util';
import {extend} from 'lodash';

const moduleOpenFormat = 'angular.module("%s"%s).run(["$templateCache", function($templateCache) {';
const entryFormat = '$templateCache.put("%s", "%s");';
const moduleCloseFormat = '}]);';

const moduleOpen = format.bind(null, moduleOpenFormat);
const entry = format.bind(null, entryFormat);
const moduleClose = format.bind(null, moduleCloseFormat);
const defaultOpts = {
  module: 'templates',
  standalone: false
};

function wrapWithModule(src, module, standalone) {
  var secondArg = standalone ? ', []' : '';
  return [
    moduleOpen(module, secondArg),
    src,
    moduleClose()
  ].join('\n');
}

export default function render(opts) {
  const {src, srcPath, module, standalone} = extend({}, defaultOpts, opts);
  var expression = entry(srcPath, escape(src));

  if (module) {
    return wrapWithModule(expression, module, standalone);
  }
  else {
    return expression;
  }
}
