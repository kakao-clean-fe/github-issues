export const pipe = (...fn) => args => fn.reduce((arg, nextFn) => nextFn(arg), args);
