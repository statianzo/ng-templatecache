import escape from 'js-string-escape';
import {format} from 'util';
import {map, mixin, compose, join, apply, append, identity, lPartial} from 'ramda';
import url from 'url';

const moduleOpenFormat = 'angular.module("%s"%s).run(["$templateCache", function($templateCache) {';
const entryFormat = '$templateCache.put("%s", "%s");';
const moduleCloseFormat = '}]);';

const defaultOpts = {
  entries: [],
  module: 'templates',
  standalone: false,
  prefix: ''
};

const normalizeUrl = compose(url.format, url.parse);

function openModule(module, standalone) {
  const open = format(moduleOpenFormat, module, standalone ? ', []' : '');
  return module ? append(open) : identity;
}

function closeModule(module) {
  const close = format(moduleCloseFormat);
  return module ? append(close) : identity;
}

function appendEntry(prefix, entry) {
  const {path, content} = entry;
  const prefixedPath = normalizeUrl(prefix + path);
  const line = format(entryFormat, prefixedPath, escape(content));
  return append(line);
}

export default function render(opts) {
  const {entries, module, standalone, prefix} = mixin(defaultOpts, opts);
  const entryOps = map(lPartial(appendEntry, prefix), entries);
  const ops = [].concat(
    join('\n'),
    closeModule(module, standalone),
    entryOps,
    openModule(module, standalone)
  );

  return apply(compose, ops)([]);
}
