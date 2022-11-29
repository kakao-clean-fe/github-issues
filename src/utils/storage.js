export const getStorageItem = (key, defaultValue, storage = localStorage) => {
  return storage.getItem(key, defaultValue);
}
export const setStorageItem = (key, value, storage = localStorage) => {
  const _value = typeof value === 'string' ? value : JSON.stringify(value);
  storage.setItem(key, _value);
}