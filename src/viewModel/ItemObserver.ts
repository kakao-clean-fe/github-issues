import Observable from './Observable';
import { itemStore } from '../model/ItemStore';
import { Item, Status } from '../../types';
import { STATUS } from '../common/constants';
import { API } from '../common/util';

const ItemObservable = () => {
  const observer = Observable(itemStore);
  const changeSelectedFilter = (status: Status | '') => {
    observer.setData({
      ...observer.getData(),
      selectedFilter: status,
    });
  };
  const changeSelectedFilterToOpen = () => {
    changeSelectedFilter(STATUS.OPEN);
  };
  const changeSelectedFilterToClose = () => {
    changeSelectedFilter(STATUS.CLOSE);
  };
  const changeSelectedFilterToAll = () => {
    changeSelectedFilter('');
  };

  (async () => {
    const data = await API.GET<Item[]>({
      url: './data-sources/issues.json',
      errorMessage: '초기데이터 로딩에 실패했습니다.',
    });
    observer.setData({
      initData: data,
      selectedFilter: '',
    });
  })();
  const getData = observer.getData;
  const subscribe = observer.subscribe;

  return {
    changeSelectedFilterToClose,
    changeSelectedFilterToOpen,
    changeSelectedFilterToAll,
    getData,
    subscribe,
  };
};
const itemObserver = ItemObservable();

export { itemObserver };
