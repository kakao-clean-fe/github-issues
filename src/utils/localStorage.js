
export const localStorageUtil = {
  getItem: key => localStorage.getItem(key),
  setItem: (key, data) => localStorage.setItem(key, data),
};

export const resetLocalStorage = () => {
  localStorage.clear();
}