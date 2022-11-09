// 파이프 함수
export const pipe = (...fns) => res => fns.reduce((acc, fn) => fn(acc), res);

// 필터 함수
export const filter = (arr, fn) => {
	const result = [];

    arr.forEach((el, index) => {
        fn(el, index, arr) ? result.push(el) : null
    })

	return result;
};

