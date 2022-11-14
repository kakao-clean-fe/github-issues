const _pipe =
  (a, b) =>
  (...arg) =>
    b(a(...arg));
const pipe = (...ops) => ops.reduce(_pipe);

const pipeAsync =
  (...ops) =>
  (arg) =>
    ops.reduce((p, f) => p.then(f), Promise.resolve(arg));

const functionUtils = {
  pipe,
  pipeAsync,
};

export { functionUtils };
