export const getStorageItem = (storage = localStorage, key, defaultValue) => {
  return storage.getItem(key, defaultValue);
}
export const setStorageItem = (storage = localStorage, key, value) => {
  const _value = typeof value === 'string' ? value : JSON.stringify(value);
  storage.setItem(key, _value);
}