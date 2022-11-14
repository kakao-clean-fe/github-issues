import { IFunctionComponent } from '../common/FunctionComponent';
import { isEquals } from '../common/util';
import { IStore } from '../store/Store';

export default <T = any>(store: IStore<T>) => {
  const _subscribeList: IFunctionComponent[] = [];

  const notifyData = () => {
    _subscribeList.forEach((component) => {
      try {
        component.render();
      } catch (error) {}
    });
  };

  const subscribe = (component) => {
    _subscribeList.push(component);
  };

  const setData = (newData: T) => {
    if (!isEquals(store.getData(), newData)) {
      store.setData(newData);
      notifyData();
    }
  };

  const getData = () => store.getData();
  return { subscribe, setData, getData };
};
