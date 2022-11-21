export const pipe = (...funcs) => {
  return (value) => funcs.reduce((acc, func) => func(acc), value);
};

export const findByClass = (target) => (className) => {
  return target.querySelector(`.${className}`);
};

const parser = new DOMParser();

const toHtml = (text) =>
  parser.parseFromString(text, "text/html").body.firstChild;

export const toFetch = (path, options) =>
  fetch(path, options).then((res) => {
    if (res.status < 200 || res.status >= 300) {
      throw res;
    }
    return res.json();
  });

export const renderLayout = (layoutTemplate) => (target) => {
  const html = pipe(layoutTemplate, toHtml);
  target.appendChild(html());
  return html;
};

const renderItems = (itemTemplate, target, items) => {
  target.innerText = "";
  items
    .map(itemTemplate)
    .map(toHtml)
    .forEach((el) => target.appendChild(el));
};

export const filter = (cb) => (items) => items.filter(cb);

export const toggleUI =
  (className) =>
  ([additionTarget, deletionTarget]) => {
    additionTarget.classList.add(className);
    deletionTarget.classList.remove(className);
  };

export const updateUI =
  (itemTemplate, listEl, elements, prefix) =>
  (items, ...data) => {
    listEl.innerText = "";
    console.log(items);
    renderItems(itemTemplate, listEl, items);
    elements.forEach((el, idx) => {
      el.innerText = `${data[idx].length} ${prefix[idx]}`;
    });
  };

export const createColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
