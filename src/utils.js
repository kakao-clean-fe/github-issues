// 파이프 함수
export const pipe = (...fns) => res => fns.reduce((acc, fn) => fn(acc), res);
// 패치 함수
export const fetchData = (url) => fetch(url).then((response) => response.json());


