import {
  getIssueItemTpl,
  getIssueTpl,
  getLabelItemTpl,
  getLabelTpl,
} from "./tpl.js";

import store from "./store.js";
import { ISSUE_STATUS } from "./constant.js";


const app$ = document.getElementById("app");
app$.innerHTML = getIssueTpl();

const issueList$ = document.querySelector(".issue-list ul");
const openCount$ = document.querySelector(".open-count");
const closeCount$ = document.querySelector(".close-count");

openCount$.addEventListener("click", () =>
  store.setSelectedStatus(ISSUE_STATUS.OPEN)
);
closeCount$.addEventListener("click", () =>
  store.setSelectedStatus(ISSUE_STATUS.CLOSE)
);

store.addChangeListener(store.selectOpenIssues, (openIssues) => {
  openCount$.innerHTML = `${openIssues.length} Opens`;
});

store.addChangeListener(store.selectCloseIssues, (closeIssues) => {
  closeCount$.innerHTML = `${closeIssues.length} Closed`;
});

store.addChangeListener(store.selectCurrentIssues, (issues) => {
  console.log(issues);
  issueList$.innerHTML = issues.map((issue) => getIssueItemTpl(issue)).join("");
});

store.addChangeListener(store.selectSelectedStatus, (status) => {
  const boldClass = "font-bold";
  if (status === ISSUE_STATUS.OPEN) {
    openCount$.classList.add(boldClass);
    return closeCount$.classList.remove(boldClass);
  }
  closeCount$.classList.add(boldClass);
  openCount$.classList.remove(boldClass);
});

