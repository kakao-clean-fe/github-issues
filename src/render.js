import {
  KEY_CLOSE,
  KEY_OPEN,
  CLASS_OPEN_COUNT_VALUE,
  CLASS_CLOSE_COUNT_VALUE,
  CLASS_ISSUE_LIST,
} from "./constants";
import { getIssueItemTpl } from "./tpl";

export const renderFilterList = (key, items) => {
  document.querySelector(".issue-list-ul").innerHTML = "";
  switch (key) {
    case KEY_OPEN:
      const openItems = items.filter((issue) => issue.status === KEY_OPEN);
      renderItems(openItems);
      break;
    case KEY_CLOSE:
      const closeItems = items.filter((issue) => issue.status === KEY_CLOSE);
      renderItems(closeItems);
      break;
  }
};

export const renderList = (items) => {
  const openCnt = items.filter((issue) => issue.status === KEY_OPEN).length;
  const closeCnt = items.filter((issue) => issue.status === KEY_CLOSE).length;

  document.querySelector(CLASS_OPEN_COUNT_VALUE).innerHTML = openCnt;
  document.querySelector(CLASS_CLOSE_COUNT_VALUE).innerHTML = closeCnt;

  renderItems(items);
};

const renderItems = (items) => {
  items.map((issue) => {
    document.querySelector(CLASS_ISSUE_LIST).innerHTML +=
      getIssueItemTpl(issue);
  });
};
