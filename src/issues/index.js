import {
  getIssueItemTpl,
  getIssueTpl,
} from "../tpl.js";

import issueStore from "..//store/issueStore.js";
import { EVENTS, ISSUE_STATUS } from "../constant.js";
import { addClassList, on, cacheFunction, removeClassList, render } from "../utils/index.js";

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
  on({
    selector: SELECTORS.OEPN_COUNT, 
    event: EVENTS.CLICK, 
    callback: clickOpenHandler
  });
  on({
    selector: SELECTORS.CLOSE_COUNT, 
    event: EVENTS.CLICK, 
    callback: clickCloseHandler
  });
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

const boldOpen = (isOpen) => isOpen ? addClassList({
  selector: SELECTORS.OEPN_COUNT, 
  classes: CLASS_BOLD
}) : removeClassList({
  selector: SELECTORS.OEPN_COUNT, 
  classes: CLASS_BOLD
});
const boldClose = (isClose) => isClose ? addClassList({
  selector: SELECTORS.CLOSE_COUNT, 
  classes: CLASS_BOLD
}) : removeClassList({
  selector: SELECTORS.CLOSE_COUNT, 
  classes: CLASS_BOLD
});
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

const initIssues = () => {

  render(SELECTORS.APP, getIssueTpl());
  initEventListeners();
  initStateChangeListeners();
}

export default initIssues;

