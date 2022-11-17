import { getIssuesData } from "../api";
import {
  ID_APP,
  CLASS_CLOSE_BTN,
  CLASS_OPEN_BTN,
  KEY_CLOSE,
  KEY_OPEN,
} from "../constants";
import { GlobalStore } from "../store";
import { getIssueTpl } from "../tpl";
import { renderFilterList, renderList } from "./render";

const store = GlobalStore();

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
  const issues = store.getStoreKey("issues");
  if (!issues) return;
  renderFilterList(KEY_OPEN, issues);
};

const evtCloseCountClick = () => {
  const issues = store.getStoreKey("issues");
  if (!issues) return;
  renderFilterList(KEY_CLOSE, issues);
};

export const IssuePageinit = async () => {
  // 템플릿 그리기
  document.querySelector(ID_APP).innerHTML = getIssueTpl();
  // 이벤트 핸들러 구현
  addEventHandler();
  // 데이터 조회
  await getIssuesData(store);
  // 데이터 렌더링
  const issues = store.getStoreKey("issues");
  renderList(issues);
};
