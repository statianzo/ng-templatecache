import escape from 'js-string-escape';
import {format} from 'util';
import {mixin, compose, join, apply, append, identity} from 'ramda';

const moduleOpenFormat = 'angular.module("%s"%s).run(["$templateCache", function($templateCache) {';
const entryFormat = '$templateCache.put("%s", "%s");';
const moduleCloseFormat = '}]);';

const defaultOpts = {
  entries: [],
  module: 'templates',
  standalone: false
};

function openModule(module, standalone) {
  const open = format(moduleOpenFormat, module, standalone ? ', []' : '');
  return module ? append(open) : identity;
}

function closeModule(module) {
  const close = format(moduleCloseFormat);
  return module ? append(close) : identity;
}

function appendEntry(entry) {
  const {path, content} = entry;
  const line = format(entryFormat, path, escape(content));
  return append(line);
}

export default function render(opts) {
  const {entries, module, standalone} = mixin(defaultOpts, opts);
  const entryOps = entries.map(appendEntry);
  const ops = [].concat(
    join('\n'),
    closeModule(module, standalone),
    entryOps,
    openModule(module, standalone)
  );

  return apply(compose, ops)([]);
}
