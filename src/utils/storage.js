export const getStorageItem = (key, defaultValue, storage) => {
  return storage.getItem(key, defaultValue);
}
export const setStorageItem = (key, value, storage) => {
  const _value = typeof value === 'string' ? value : JSON.stringify(value);
  storage.setItem(key, _value);
}