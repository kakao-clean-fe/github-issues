import { addClickEventListener, toggleClass, renderInnerHtml } from '~/utils/dom';
import { countArray } from '~/utils/array';
import { ISSUE_CLOSE_COUNT_SELECTOR, ISSUE_OPEN_COUNT_SELECTOR } from '~/constants/selector';
import { getElement } from '~/store/element-store';
import { setIssueQuery, openedIssues, closedIssues, setIssuesWatcher } from '~/store/issue-store';
import type { Issue } from '~/types/issue';

// 렌더링
const countIssueStatus = ({ issues }: { issues: Issue[] }): number => countArray({ arr: issues });

const getIssueStatusCountData = () => {
  return [
    { parent: getElement({ selector: ISSUE_OPEN_COUNT_SELECTOR }), html: `${countIssueStatus({ issues: openedIssues() })} Opens` },
    { parent: getElement({ selector: ISSUE_CLOSE_COUNT_SELECTOR }), html: `${countIssueStatus({ issues: closedIssues() })} Closed` }
  ];
};

const render = (): void => {
  getIssueStatusCountData().forEach(renderInnerHtml);
};

// 이벤트 핸들러
const setActiveFilterStyle = () => {
  const style = 'font-bold';
  toggleClass(getElement({ selector: ISSUE_OPEN_COUNT_SELECTOR }), style);
  toggleClass(getElement({ selector: ISSUE_CLOSE_COUNT_SELECTOR }), style);
};

const getOpenIssueEventData = () => {
  return {
    element: getElement({ selector: ISSUE_OPEN_COUNT_SELECTOR }),
    eventHandler: () => {
      setIssueQuery({ status: 'open' });
      setActiveFilterStyle();
    }
  };
};

const getClosedIssueEventData = () => {
  return {
    element: getElement({ selector: ISSUE_CLOSE_COUNT_SELECTOR }),
    eventHandler: () => {
      setIssueQuery({ status: 'close' });
      setActiveFilterStyle();
    }
  };
};

const getIssueStatusEventData = () => {
  return [getOpenIssueEventData(), getClosedIssueEventData()];
};

const initEventHandler = (): void => {
  getIssueStatusEventData().forEach(addClickEventListener);
};

export const initIssueCountComponent = (): void => {
  setIssuesWatcher(() => {
    render();
    initEventHandler();
  });
};
