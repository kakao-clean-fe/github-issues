const removeAll = (paths, className) =>
  paths.forEach((path) => path.classList?.remove(className));

const remove = (target, className) => target.classList.remove(className);

const classUtils = { removeAll, remove };
export { classUtils };
