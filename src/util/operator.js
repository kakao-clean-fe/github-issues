// args2는 배열 아닌 인자
export const compose = (...args1) => {
  return (args2) => args1.reduceRight((acc, fn) => fn(acc), args2);
}

export const multipleArgsPipe = (...args1) => {
  return (...args2) => args1.reduce((acc, fn) => {
    return (Array.isArray(acc)) ? fn(...acc) : fn(acc);
  }, args2);
}

export const pipe = (...args1) => {
  return (...args2) => args1.reduce((acc, fn) => fn(acc), args2);
}

/**
 * Object에 쓰는 연산자
 */
export const omit = (target, key) => {
  const {[key]: omitted, ...res} = target;
  
  return res;
}