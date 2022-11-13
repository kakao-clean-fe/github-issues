export const GlobalStore = () => {
  let store = {};

  const setStore = (jsonInputData) => {
    const strInputData = JSON.stringify(jsonInputData);
    if (strInputData) {
      store = jsonInputData;
    }
  };

  const getStore = () => {
    return store;
  };

  const getStoreKey = (key) => {
    return store[key] || null;
  }

  return {
    setStore,
    getStore,
    getStoreKey,
  };
};
