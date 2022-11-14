export interface IStore<T> {
  getData: () => T;
  setData: (data: T) => void;
}

export default <T = any>(initData: T): IStore<T> => {
  let _initData: T = initData;

  const setData = (data) => {
    _initData = data;
  };
  const getData = () => {
    return _initData;
  };

  return {
    getData,
    setData,
  };
};
