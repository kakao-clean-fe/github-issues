import { IFunctionComponent } from '../common/FunctionComponent';
import { IStore } from '../store/Store';

export default <T = any>(store: IStore<T>) => {
  const _subscribeList: IFunctionComponent[] = [];

  const notifyData = () => {
    _subscribeList.forEach((component) => {
      component.render();
    });
  };

  const subscribe = (component) => {
    _subscribeList.push(component);
  };

  const setData = (newData: T) => {
    store.setData(newData);
    notifyData();
  };

  const getData = () => store.getData();
  return { subscribe, setData, getData };
};
