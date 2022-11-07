import { GlobalStore } from "./store.js";
import { getIssueTpl } from "./tpl.js";
import { getIssuesData } from "./api.js";
import { renderFilterList, renderList } from "./render.js";
import {
  CLASS_APP,
  CLASS_CLOSE_BTN,
  CLASS_OPEN_BTN,
  KEY_CLOSE,
  KEY_OPEN,
} from "./constants.js";

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

init();
