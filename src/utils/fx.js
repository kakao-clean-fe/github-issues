// 함수를 전달 받아, 함수의 인자가 하나라면 함수를 리턴, 아니라면 함수 호출을 한다.
export const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

// reduce를 이용해 인자로 전달한 함수들을 순회하며 호출을 누적해 나간다.
export const go = (...args) => reduce((a, f) => f(a), args);

// 최종적으로 go를 호출하는 함수를 리턴한다.
export const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);

export const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

export const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

export const reduce = curry((f, acc, iter) => {
  // acc를 사용자가 넘기지 않았을 때의 처리
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});
