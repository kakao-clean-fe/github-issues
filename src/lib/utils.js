export const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

export const pipe =
    (...functions) =>
        (args) =>
            functions.reduce((arg, nextFn) => nextFn(arg), args);
