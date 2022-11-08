import {
  getIssueItemTpl,
  getIssueTpl,
} from "./tpl.js";

import issueStore from "./store/issueStore.js";
import { ISSUE_STATUS } from "./constant.js";
import { addClassList, on, cacheFunction, removeClassList, render } from "./utils/index.js";

const SELECTORS = {
  APP: '#app',
  OEPN_COUNT: '.open-count',
  CLOSE_COUNT: '.close-count',
  ISSUE_LIST: '.issue-list ul'
}
const CLASS_BOLD = 'font-bold'


const setSelectedStatus = (status) =>
  issueStore.setState({ ...issueStore.getState(), selectedStatus: status });

const clickOpenHandler = () => setSelectedStatus(ISSUE_STATUS.OPEN);
const clickCloseHandler = () => setSelectedStatus(ISSUE_STATUS.CLOSE);

const initEventListeners = () => {
  on(SELECTORS.OEPN_COUNT, "click", clickOpenHandler);
  on(SELECTORS.CLOSE_COUNT, "click", clickCloseHandler);
}

const renderOpenIssuesCount = (openIssues) =>
  render(SELECTORS.OEPN_COUNT, `${openIssues.length} Opens`);
const renderCloseIssuesCount = (closedIssues) =>
  render(SELECTORS.CLOSE_COUNT, `${closedIssues.length} Closed`);

const renderIssues = (issues) =>
  render(
    SELECTORS.ISSUE_LIST,
    issues.map((issue) => getIssueItemTpl(issue)).join("")
  );

const boldOpen = (isOpen) => isOpen ? addClassList(SELECTORS.OEPN_COUNT, CLASS_BOLD) : removeClassList(SELECTORS.OEPN_COUNT, CLASS_BOLD);
const boldClose = (isClose) => isClose ? addClassList(SELECTORS.CLOSE_COUNT, CLASS_BOLD) : removeClassList(SELECTORS.CLOSE_COUNT, CLASS_BOLD);
const boldByIssueStatus = (status) => {
  const isOpen = status === ISSUE_STATUS.OPEN;
  boldOpen(isOpen);
  boldClose(!isOpen);
};

const initStateChangeListeners =() => {
  issueStore.addChangeListener(
    issueStore.selectOpenIssues,
    cacheFunction(renderOpenIssuesCount)
  );
  
  issueStore.addChangeListener(
    issueStore.selectCloseIssues,
    cacheFunction(renderCloseIssuesCount)
  );
  
  issueStore.addChangeListener(issueStore.selectSelectedStatus, cacheFunction(boldByIssueStatus));
  issueStore.addChangeListener(issueStore.selectCurrentIssues, cacheFunction(renderIssues));
}

render(SELECTORS.APP, getIssueTpl());
initEventListeners();
initStateChangeListeners();