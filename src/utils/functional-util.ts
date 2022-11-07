export const pipe = (...funcList: any) => (args: unknown) => funcList.reduce((prev, func) => func(prev), args);
