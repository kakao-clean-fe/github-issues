export const getRandom = (arr) => {
  return Math.floor(Math.random() * arr.length);
}

export const isHexColor = (value) => {
  return /^#[0-9A-F]{6}$/i.test(value);
}

export const isValid = (target) => target.validity.valid;

const getPromiseData = (url) => {
  return fetch(url).then(res => res.json())
}

export const fetchStoreData = (url) => (store) => {
  getPromiseData(url).then(data => store.setValue(data));
}