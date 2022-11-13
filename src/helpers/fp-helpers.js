export const pipe = (...args) => (val) => args.reduce((acc, curr) => curr(acc), val);

export const asyncPipe = (...args) => val => args.reduce(async (y, fn) => fn(await y), val);

export const tab = fn => data => {
  fn(data);
  return data;
};

export const filter = fn => data => data.filter(fn);

export const forEach = fn => data => data.forEach(fn);
