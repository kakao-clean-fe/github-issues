import { Status } from '../../../types';
import { STATUS } from '../../common/constants';
import FunctionComponent from '../../common/FunctionComponent';
import { getIssueBodyTpl, getIssueItemTpl } from '../../common/tpl';
import { itemObserver } from '../../viewModel/ItemObserver';

const IssueBody = () => {
  const app = FunctionComponent();
  const appDiv = document.createElement('div');
  const {
    getFilteredData,
    getOpensCount,
    getClosedCount,
    subscribe,
    changeSelectedFilterToClose,
    changeSelectedFilterToOpen,
    changeSelectedFilterToAll,
    getSelectedFilter,
  } = itemObserver;
  subscribe(app);
  const { addAfterRender, setComponent, addEventListener, getElement } = app;

  addAfterRender(() => {
    setOpenStatusCount();
    setCloseStatusCount();
    setStatusBold();
  });

  const getFilterEle = (status: Status) => getElement(`.${status}-count`);
  const getOpenFilterEle = () => getFilterEle(STATUS.OPEN);
  const getCloseFilterEle = () => getFilterEle(STATUS.CLOSE);
  const setOpenStatusCount = () => {
    const openEle = getOpenFilterEle();
    openEle.innerHTML = `${getOpensCount()} Opens`;
  };
  const setCloseStatusCount = () => {
    const closeEle = getCloseFilterEle();
    closeEle.innerHTML = `${getClosedCount()} Closed`;
  };

  const setStatusBold = () => {
    switch (getSelectedFilter()) {
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

  addEventListener('.open-count', 'click', (e) => {
    getSelectedFilter() === '' || getSelectedFilter() === STATUS.CLOSE
      ? changeSelectedFilterToOpen()
      : changeSelectedFilterToAll();
  });
  addEventListener('.close-count', 'click', (e) => {
    getSelectedFilter() === '' || getSelectedFilter() === STATUS.OPEN
      ? changeSelectedFilterToClose()
      : changeSelectedFilterToAll();
  });

  return setComponent(
    () =>
      getIssueBodyTpl(getFilteredData().map((data) => getIssueItemTpl(data))),
    appDiv
  );
};

export default IssueBody;
