import {
  getIssueItemTpl,
  getIssueTpl,
} from "./tpl.js";

import issueStore from "./store/issueStore.js";
import { ISSUE_STATUS } from "./constant.js";
import { addClassList, addEventListener, removeClassList, render } from "./utils/index.js";


const SELECTORS = {
  APP: '#app',
  OEPN_COUNT: '.open-count',
  CLOSE_COUNT: '.close-count',
  ISSUE_LIST: '.issue-list ul'
}
const CLASS_BOLD = 'font-bold'
render(SELECTORS.APP, getIssueTpl());


const setSelectedStatus = (status) =>
  issueStore.setState({ ...issueStore.getState(), selectedStatus: status });

const selectOpen = () => setSelectedStatus(ISSUE_STATUS.OPEN);
const selectClose = () => setSelectedStatus(ISSUE_STATUS.CLOSE);
addEventListener(SELECTORS.OEPN_COUNT, "click", selectOpen);
addEventListener(SELECTORS.CLOSE_COUNT, "click", selectClose);

const renderOpenIssuesCount = (openIssues) =>
  render(SELECTORS.OEPN_COUNT, `${openIssues.length} Opens`);
const renderCloseIssuesCount = (closedIssues) =>
  render(SELECTORS.CLOSE_COUNT, `${closedIssues.length} Closed`);

const renderIssues = (issues) =>
  render(
    SELECTORS.ISSUE_LIST,
    issues.map((issue) => getIssueItemTpl(issue)).join("")
  );

issueStore.addChangeListener(
  issueStore.selectOpenIssues,
  renderOpenIssuesCount
);

issueStore.addChangeListener(
  issueStore.selectCloseIssues,
  renderCloseIssuesCount
);

issueStore.addChangeListener(issueStore.selectSelectedStatus, boldByIssueStatus);
issueStore.addChangeListener(issueStore.selectCurrentIssues, renderIssues);

const boldOpen = (isOpen) => isOpen ? addClassList(SELECTORS.OEPN_COUNT, CLASS_BOLD) : removeClassList(SELECTORS.OEPN_COUNT, CLASS_BOLD);
const boldClose = (isClose) => isClose ? addClassList(SELECTORS.CLOSE_COUNT, CLASS_BOLD) : removeClassList(SELECTORS.CLOSE_COUNT, CLASS_BOLD);
const boldByIssueStatus = (status) => {
  boldOpen(status === ISSUE_STATUS.OPEN);
  boldClose(status === ISSUE_STATUS.CLOSE);
};

