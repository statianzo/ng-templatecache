import escape from 'js-string-escape';
import {format} from 'util';
import {extend, compose} from 'lodash';

const moduleOpenFormat = 'angular.module("%s"%s).run(["$templateCache", function($templateCache) {';
const entryFormat = '$templateCache.put("%s", "%s");';
const moduleCloseFormat = '}]);';

const defaultOpts = {
  entries: [],
  module: 'templates',
  standalone: false
};

function join(sep) {
  return (lines) => lines.join(sep);
}

function wrapInModule(module, standalone) {
  const open = format(moduleOpenFormat, module, standalone ? ', []' : '');
  const close = format(moduleCloseFormat);
  return module ?
    (lines) => [].concat(open, lines, close) :
    (lines) => lines;
}

function appendEntry(entry) {
  const {srcPath, src} = entry;
  const line = format(entryFormat, srcPath, escape(src));
  return function (lines) {
    lines.push(line);
    return lines;
  };
}

export default function render(opts) {
  const {entries, module, standalone} = extend({}, defaultOpts, opts);
  const entryOps = entries.map(appendEntry);
  const ops = [].concat(
    join('\n'),
    wrapInModule(module, standalone),
    entryOps
  );

  return compose.apply(null, ops)([]);
}
