import { Item, Status } from '../types';
import { STATUS } from './constants';
import FunctionComponent from './FunctionComponent';
import Issue from './Issue';
import { getIssueTpl } from './tpl';
import { API } from './util';

const App = (appElement: Element) => {
  const {
    addAfterRender,
    useState,
    useEffect,
    setComponent,
    addEventListener,
    getRoot,
    getElement,
  } = FunctionComponent();

  const [state, setState] = useState<{
    selectedFilter: Status | '';
    initData: Item[];
  }>({
    initData: [],
    selectedFilter: '',
  });

  addAfterRender(() => {
    setOpenStatusCount();
    setCloseStatusCount();
    setStatusBold();
  });

  const getFilterEle = (status: Status) => getElement(`.${status}-count`);
  const getOpenFilterEle = () => getFilterEle(STATUS.OPEN);
  const getCloseFilterEle = () => getFilterEle(STATUS.CLOSE);
  const getDataByFiltered = (status: Status | '') =>
    state.initData.filter((e) => e.status.includes(status));
  const setOpenStatusCount = () => {
    const openEle = getOpenFilterEle();
    openEle.innerHTML = `${
      state.initData.filter((e) => e.status === STATUS.OPEN).length
    } Opens`;
  };
  const setCloseStatusCount = () => {
    const closeEle = getCloseFilterEle();
    closeEle.innerHTML = `${
      state.initData.filter((e) => e.status === STATUS.CLOSE).length
    } Closed`;
  };

  const setStatusBold = () => {
    switch (state.selectedFilter) {
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
        getDataByFiltered(state.selectedFilter)
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
    setState({
      ...state,
      initData: data,
    });
  });

  addEventListener('.open-count', 'click', (e) => {
    setState({
      ...state,
      selectedFilter:
        state.selectedFilter === '' || state.selectedFilter === STATUS.CLOSE
          ? STATUS.OPEN
          : '',
    });
  });
  addEventListener('.close-count', 'click', (e) => {
    setState({
      ...state,
      selectedFilter:
        state.selectedFilter === '' || state.selectedFilter === STATUS.OPEN
          ? STATUS.CLOSE
          : '',
    });
  });
  return getRoot().innerHTML;
};
export default App;
