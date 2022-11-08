import {STATUS, TAB} from "./constants.js";
import {getIssueTpl, getIssueItemTpl, getLabelTpl, getLabelItemTpl} from "./tpl.js";
import {getData, createRenderer, createEventBinder, asyncPipe, getClassList} from "./utils.js";

(
  () => {
    /* definitions */
    const appRenderer = createRenderer("#app");
    const issueListRenderer = createRenderer("#app .issue-list ul");
    const labelListRenderer = createRenderer("#app ul.label-list");
    const statusTabEventBinder = createEventBinder("#app .statusTab .cursor-pointer");
    const data = {
      issues: [],
      labels: [],
    };
    let activeTab = TAB.ISSUE;
    let activeStatus = STATUS.OPEN;

    /* 각 페이지별 렌더링 정의 */
    const render = {
      issuePage() {
        const openedIssues = data.issues.filter(({status}) => status === STATUS.OPEN);
        const closedIssues = data.issues.filter(({status}) => status === STATUS.CLOSE);
        const filteredIssues = activeStatus === STATUS.OPEN ? openedIssues : closedIssues;
        const templates = {
          app: getIssueTpl({
            numOpened: openedIssues.length,
            numClosed: closedIssues.length,
            activeStatus: activeStatus,
          }),
          issueList: filteredIssues.map((item) => getIssueItemTpl(item))
        }

        // attach app(clear)
        appRenderer(templates.app);

        // attach issueList
        issueListRenderer(templates.issueList);

        // bind events
        statusTabEventBinder("click")(getClassList, events.clickStatus, render);
      },
      labelPage() {
        const filteredLabels = data.labels;
        const templates = {
          app: getLabelTpl({numLabels: filteredLabels.length}),
          labelList: filteredLabels.map((item) => getLabelItemTpl(item))
        }

        // attach app(clear)
        appRenderer(templates.app);

        // attach labelList
        labelListRenderer(templates.labelList);
      },

      /* render: #app 하위의 html을 clear하고 새롭게 렌더링 */
      main() {
        switch (activeTab) {
          case TAB.ISSUE:
            render.issuePage(activeStatus);
            break;
          case TAB.LABEL:
            render.labelPage();
            break;
        }
      }
    };

    const events = {
      /* 상단 nav 내 issue, label 이벤트 */
      clickTab: (classList) => {
        if (classList.contains(TAB.ISSUE)) {
          if (activeTab === TAB.ISSUE) return;
          activeTab = TAB.ISSUE;

        } else {
          if (activeTab === TAB.LABEL) return;
          activeTab = TAB.LABEL;
        }
      },

      /* opens/closed click event */
      clickStatus: (classList) => {
        if (classList.contains("active")) return;
        activeStatus = classList.contains("open-count") ? STATUS.OPEN : STATUS.CLOSE
      },
    };

    /* init: 페이지 진입시 초기 세팅(nav 이벤트, 데이터 로드) */
    const init = async () => {
      // nav event
      createEventBinder("nav button.tab")("click")(getClassList, events.clickTab, render.main);

      // load data
      data.issues = await getData("data-sources/issues.json");
      data.labels = await getData("data-sources/labels.json");
    };

    /* main: 전체 실행 함수 */
    const main = asyncPipe(init, render.main)

    /* 실행 */
    main();
  }
)();
