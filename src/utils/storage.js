export const STORAGE_KEY = {
  LABEL_NAME: 'LABEL_NAME',
  DESCRIPTION: 'DESCRIPTION',
  COLOR: 'COLOR',
}

export const storage = {
  getItem: key => sessionStorage.getItem(key),
  setItem: (key, data) => sessionStorage.setItem(key, data),
};
