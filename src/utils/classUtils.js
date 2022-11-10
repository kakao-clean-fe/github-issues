const removeAll = (paths, className) =>
  paths.forEach((path) => path.classList?.remove(className));

const classUtils = { removeAll };
export { classUtils };
