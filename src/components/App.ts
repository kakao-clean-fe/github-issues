import { Item, Status } from '../../types';
import Issue from './Issue';
import { IItemStore, itemStore } from '../model/ItemStore';
import { getIssueTpl } from '../common/tpl';
import { API } from '../common/util';
import { STATUS } from '../common/constants';
import FunctionComponent from '../common/FunctionComponent';
import Observable from '../viewModel/Observable';
import { itemObserver } from '../viewModel/ItemObserver';

const App = (appElement: Element) => {
  const app = FunctionComponent();
  const {
    getData,
    subscribe,
    changeSelectedFilterToClose,
    changeSelectedFilterToOpen,
    changeSelectedFilterToAll,
  } = itemObserver;
  subscribe(app);
  const {
    addAfterRender,
    useState,
    useEffect,
    setComponent,
    addEventListener,
    getRoot,
    getElement,
  } = app;

  addAfterRender(() => {
    setOpenStatusCount();
    setCloseStatusCount();
    setStatusBold();
  });

  const getFilterEle = (status: Status) => getElement(`.${status}-count`);
  const getOpenFilterEle = () => getFilterEle(STATUS.OPEN);
  const getCloseFilterEle = () => getFilterEle(STATUS.CLOSE);
  const getDataByFiltered = (items: Item[], status: Status | '') =>
    items.filter((e) => e.status.includes(status));
  const setOpenStatusCount = () => {
    const openEle = getOpenFilterEle();
    openEle.innerHTML = `${
      getData().initData.filter((e) => e.status === STATUS.OPEN).length
    } Opens`;
  };
  const setCloseStatusCount = () => {
    const closeEle = getCloseFilterEle();
    closeEle.innerHTML = `${
      getData().initData.filter((e) => e.status === STATUS.CLOSE).length
    } Closed`;
  };

  const setStatusBold = () => {
    switch (getData().selectedFilter) {
      case STATUS.OPEN:
        getOpenFilterEle().classList.add('font-bold');
        getCloseFilterEle().classList.remove('font-bold');
        break;
      case STATUS.CLOSE:
        getOpenFilterEle().classList.remove('font-bold');
        getCloseFilterEle().classList.add('font-bold');
        break;
      default:
        getOpenFilterEle().classList.remove('font-bold');
        getCloseFilterEle().classList.remove('font-bold');
        break;
    }
  };

  setComponent(
    () =>
      getIssueTpl(
        getDataByFiltered(getData().initData, getData().selectedFilter)
          .map((e) => Issue(e))
          .join('')
      ),
    appElement
  );

  addEventListener('.open-count', 'click', (e) => {
    const { selectedFilter } = getData();
    selectedFilter === '' || selectedFilter === STATUS.CLOSE
      ? changeSelectedFilterToOpen()
      : changeSelectedFilterToAll();
  });
  addEventListener('.close-count', 'click', (e) => {
    const { selectedFilter } = getData();
    selectedFilter === '' || selectedFilter === STATUS.OPEN
      ? changeSelectedFilterToClose()
      : changeSelectedFilterToAll();
  });
  return getRoot().innerHTML;
};
export default App;
