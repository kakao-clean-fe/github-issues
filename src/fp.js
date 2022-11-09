import { curry } from './curry';

export const go = (_, ...fs) => reduce((_, f) => f(_), _, fs);
export const pipe = (...fs) => (_) => go(_, ...fs);
export const reduce = curry(function (f, acc, iterable) {
  if (arguments.length === 2) {
    iterable = acc[Symbol.iterator]();
    acc = iterable.next().value;
  }
  for (let _ of iterable) {
    acc = f(acc, _);
  }
  return acc;
});

export const L = {};
L.map = curry(function* (f, iterable) {
  for (const _ of iterable) yield f(_);
});

L.filter = curry(function* (f, iterable) {
  for (const _ of iterable) {
    if (f(_)) yield _;
  }
});

L.takeUntil = curry(function* (f, iterable) {
  for (const _ of iterable) {
    yield _;
    if (f(_)) break;
  }
});

L.take = curry(function (limit, iterable) {
  return L.takeUntil((_) => --limit === 0, iterable);
});

L.range = curry(function* (start, stop, step = 1) {
  while (start < stop) {
    yield start;
    start += step;
  }
});
