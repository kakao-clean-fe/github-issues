export const Q = (query) => {
  return document.querySelector(query);
}

export const on = ( selector, evt, callback ) => {
  document.querySelector(selector).addEventListener(evt, callback);
};

export const toggleClass = ( selector, className, type) => {
  if (type) {
    document.querySelector(selector).classList.add(className);
  } else {
    document.querySelector(selector).classList.remove(className);
  }
}

export const toggleAttr = ( selector, attrName, type) => {
  if (type) {
    document.querySelector(selector).setAttribute(attrName, '');
  } else {
    document.querySelector(selector).removeAttribute(attrName);
  }
}

export const fetchData = async (path) => {
  const res = await fetch(`/${path}`);
  const data = await res.json();
  return data;
}