export const getStorageItem = (key, defaultValue) => {
  return localStorage.getItem(key, defaultValue);
}
export const setStorageItem = (key, value) => {
  const _value = typeof value === 'string' ? value : JSON.stringify(value);
  localStorage.setItem(key, _value);
}