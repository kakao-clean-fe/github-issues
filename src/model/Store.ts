import { IFunctionComponent } from '../common/FunctionComponent';

export interface IStore<T> {
  getData: () => T;
  setData: (data: T) => void;
  undo: () => void;
  subscribe: (
    component
  ) => IFunctionComponent & { getData: () => T; setData: (data: T) => void };
}

export default <T = any>(initData: T): IStore<T> => {
  const _initData: T = initData;
  const _subscribeList = [];
  const _history: T[] = [initData];

  const _validate = () => {
    if (!_initData || _history.length === 0) {
      throw new Error('아직 스토어가 생성되지 않았습니.');
    }
    return true;
  };
  const subscribe = (component) => {
    _validate();
    _subscribeList.push(component);
    return {
      ...component,
      getData,
      setData,
    };
  };
  const setData = (data) => {
    _validate();
    _history.push(data);
    notifyData();
  };
  const notifyData = () => {
    _subscribeList.forEach((component) => {
      component.render();
    });
  };
  const getData = () => {
    _validate();
    return _history[_history.length - 1];
  };
  const undo = () => {
    _validate();
    if (_history.length > 1) {
      _history.pop();
      notifyData();
    } else {
      throw new Error('더 이상 취소할 데이터가 없습니다.');
    }
  };

  return {
    getData,
    setData,
    undo,
    subscribe,
  };
};
