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

export const fetchDataWithAbort = async (path, controller) => {
  if (controller.ref) {
    controller.ref.abort();
  }
  controller.ref = new AbortController();
  const signal = controller.ref.signal;
  try {
    const res = await fetch(`/${path}`, { signal });
    const data = await res.json();
    controller.ref = null;
    return data;
  } catch(err) {
    console.log(err.name);
  }
}

export const postData = async (path, data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }
  return fetch(path, options);
}