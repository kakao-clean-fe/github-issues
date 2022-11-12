import { GlobalStore } from "./store.js";
import { getIssueTpl, getLabelTpl } from "./tpl.js";
import { getIssuesData } from "./api.js";
import {
  CLASS_APP,
  CLASS_CLOSE_BTN,
  CLASS_ISSUE_TAB_BTN,
  CLASS_LABEL_TAB_BTN,
  CLASS_OPEN_BTN,
  KEY_CLOSE,
  KEY_OPEN,
} from "./constants.js";
import { renderList, renderFilterList } from "./Issue/render.js";
import ListLabelModel from "./Label/ListLabelModel.js";
import ListLabelView from "./Label/ListLabelView.js";

const labelsModel = new ListLabelModel();

const store = GlobalStore();

const init = async () => {
  // localStorage 초기화
  store.initStore();
  // 템플릿 그리기
  document.querySelector(CLASS_APP).innerHTML = getIssueTpl();
  // 데이터 조회
  await getIssuesData(store);
  // 이벤트 핸들러 구현
  addEventHandler();
  // 데이터 렌더링
  const issues = store.getStore().issues;
  renderList(issues);
};

const addEventHandler = () => {
  // opens 클릭 이벤트 구현
  document
    .querySelector(CLASS_OPEN_BTN)
    .addEventListener("click", evtOpenCountClick);
  // closed 클릭 이벤트 구현
  document
    .querySelector(CLASS_CLOSE_BTN)
    .addEventListener("click", evtCloseCountClick);
  document
    .querySelector(CLASS_ISSUE_TAB_BTN)
    .addEventListener("click", evtIssueTabClick);
  document
    .querySelector(CLASS_LABEL_TAB_BTN)
    .addEventListener("click", evtLabelTabClick);
};

const evtOpenCountClick = () => {
  const issues = store.getStore().issues;
  if (!issues) return;
  renderFilterList(KEY_OPEN, issues);
};

const evtCloseCountClick = () => {
  const issues = store.getStore().issues;
  if (!issues) return;
  renderFilterList(KEY_CLOSE, issues);
};

const evtIssueTabClick = () => {
  document.querySelector(CLASS_APP).innerHTML = getIssueTpl();
  const issues = store.getStore().issues;
  renderList(issues);
}

const evtLabelTabClick = async () => {
  document.querySelector(CLASS_APP).innerHTML = getLabelTpl();
  const labelsView = new ListLabelView({model: labelsModel});
  await labelsModel.getInitialData();
}

init();
