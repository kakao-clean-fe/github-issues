import { GlobalStore } from "./store.js";
import {
  getIssueTpl,
  getIssueItemTpl,
} from "./tpl.js";
import { getIssuesData } from "./api.js";

const store = GlobalStore();

const init = async () => {
  // localStorage 초기화
  store.initStore();
  // 템플릿 그리기
  document.querySelector("#app").innerHTML = getIssueTpl();
  // 데이터 조회
  await getIssuesData(store);
  // 이벤트 핸들러 구현
  addEventHandler();
  // 데이터 렌더링
  renderList();
};

const addEventHandler = () => {
  // opens 클릭 이벤트 구현
  document.querySelector(".open-count").addEventListener("click", evtOpenCountClick);
  // closed 클릭 이벤트 구현
  document.querySelector(".close-count").addEventListener("click", evtCloseCountClick);
};

const evtOpenCountClick = () => {
  renderFilterList('open');  
};

const evtCloseCountClick = () => {
  renderFilterList('close');  
};

const renderFilterList = (key) => {
  const items = store.getStore().issues;

  document.querySelector(".issue-list-ul").innerHTML = '';
  switch (key) {
    case 'open':
      const openItems = items.filter((issue) => issue.status === "open");
      openItems.map((issue) => {
        document.querySelector(".issue-list-ul").innerHTML += getIssueItemTpl(issue);
      });
      break;
    case 'close':
      const closeItems = items.filter((issue) => issue.status === "close");
      closeItems.map((issue) => {
        document.querySelector(".issue-list-ul").innerHTML += getIssueItemTpl(issue);
      });
      break; 
  }
};

const renderList = () => {
  const items = store.getStore().issues;

  const openCnt = items.filter((issue) => issue.status === "open").length;
  const closeCnt = items.filter((issue) => issue.status === "close").length;

  document.querySelector(".open-count-value").innerHTML = openCnt;
  document.querySelector(".close-count-value").innerHTML = closeCnt;

  items.map((issue) => {
    document.querySelector(".issue-list-ul").innerHTML += getIssueItemTpl(issue);
  });
};

export default function App() {
  init();
}

App();
