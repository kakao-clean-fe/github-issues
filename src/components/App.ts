import { Item, Status } from '../../types';
import Issue from './Issue';
import { IItemStore, itemStore } from '../model/ItemStore';
import { getIssueTpl } from '../common/tpl';
import { API } from '../common/util';
import { STATUS } from '../common/constants';
import FunctionComponent from '../common/FunctionComponent';
import Observable from '../common/Observable';

const App = (appElement: Element) => {
  const {
    addAfterRender,
    useState,
    useEffect,
    setComponent,
    addEventListener,
    getRoot,
    getElement,
    getData,
    setData,
  } = Observable<IItemStore>(itemStore);
  
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

  useEffect(async () => {
    const data = await API.GET<Item[]>({
      url: './data-sources/issues.json',
      errorMessage: '초기데이터 로딩에 실패했습니다.',
    });
    setData({
      ...getData(),
      initData: data,
    });
    console.log(itemStore);
  });

  addEventListener('.open-count', 'click', (e) => {
    const { initData, selectedFilter } = getData();
    setData({
      initData,
      selectedFilter:
        selectedFilter === '' || selectedFilter === STATUS.CLOSE
          ? STATUS.OPEN
          : '',
    });
  });
  addEventListener('.close-count', 'click', (e) => {
    const { initData, selectedFilter } = getData();
    setData({
      initData,
      selectedFilter:
        selectedFilter === '' || selectedFilter === STATUS.OPEN
          ? STATUS.CLOSE
          : '',
    });
  });
  return getRoot().innerHTML;
};
export default App;
