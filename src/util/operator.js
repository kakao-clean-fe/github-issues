// args2는 배열 아닌 인자
export const compose = (...args1) => {
  return (args2) => args1.reduceRight((acc, fn) => fn(acc), args2);
}

export const pipe = (...args1) => {
  return (...args2) => args1.reduce((acc, fn) => fn(acc), args2);
}