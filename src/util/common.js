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

export const fetchData = async (filename) => {
  const res = await fetch(`/data-sources/${filename}.json`);
  const data = await res.json();
  return data;
}