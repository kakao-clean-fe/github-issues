const localStorageKey = 'github-issues';

const GlobalStore = () => {
  let store = {};

  const initStore = () => {
    const getData = localStorage.getItem(localStorageKey);
    if (!getData) {
      localStorage.setItem(localStorageKey, '{}');
    }
    store = JSON.parse(getData);
  }

  const setStore = (jsonInputData) => {
    const strInputData = JSON.stringify(jsonInputData);
    if (strInputData) {
      localStorage.setItem(localStorageKey, strInputData);
      store = jsonInputData;
    }
  };

  const getStore = () => {
    const strData = localStorage.getItem(localStorageKey);
    return JSON.parse(strData);
  };

  return {
    initStore,
    setStore,
    getStore,
  };
};

export default GlobalStore;
