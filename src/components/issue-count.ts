import { addClickEventListener, toggleClass, renderInnerHtml } from '~/utils/dom';
import { filterArray, countArray } from '~/utils/array';
import { pipe } from '~/utils/functional-util';
import { ISSUE_CLOSE_COUNT_SELECTOR, ISSUE_OPEN_COUNT_SELECTOR } from '~/constants/selector';
import { filterOpenedIssues, filterClosedIssues } from '~/utils/issue';
import { IssueList } from './issue-list';
import { getElement } from '~/store/element-store';

import type { Issue, Status } from '~/types/issue';

// 렌더링
const countIssueStatus = ({ issues, status }: { issues: Issue[], status: Status }): number => {
  return pipe(
    filterArray,
    (arr) => countArray({ arr })
  )({ arr: issues, filterFunc: (issue: Issue) => issue.status === status });
};

const getIssueStatusCountData = (issues: Issue[]) => {
  return [
    { parent: getElement(ISSUE_OPEN_COUNT_SELECTOR), html: `${countIssueStatus({ issues, status: 'open' })} Opens` },
    { parent: getElement(ISSUE_CLOSE_COUNT_SELECTOR), html: `${countIssueStatus({ issues, status: 'close' })} Closed` }
  ];
};

const render = (issues: Issue[]): void => {
  getIssueStatusCountData(issues).forEach(renderInnerHtml);
};

// 이벤트 핸들러
const setActiveFilterStyle = () => {
  const style = 'font-bold';
  toggleClass(getElement(ISSUE_OPEN_COUNT_SELECTOR), style);
  toggleClass(getElement(ISSUE_CLOSE_COUNT_SELECTOR), style);
};

const filterIssuesAndRender = ({ filterFunction, issues }: { filterFunction: (...args: unknown[]) => unknown[], issues: Issue[] }): void => {
  pipe(filterFunction, (issues: Issue[]) => IssueList({ issues }))(issues);
};

const getOpenIssueEventData = (issues: Issue[]) => {
  return {
    element: getElement(ISSUE_OPEN_COUNT_SELECTOR),
    eventHandler: () => {
      filterIssuesAndRender({ filterFunction: filterOpenedIssues, issues });
      setActiveFilterStyle();
    }
  };
};

const getClosedIssueEventData = (issues: Issue[]) => {
  return {
    element: getElement(ISSUE_CLOSE_COUNT_SELECTOR),
    eventHandler: () => {
      filterIssuesAndRender({ filterFunction: filterClosedIssues, issues });
      setActiveFilterStyle();
    }
  };
};

const getIssueStatusEventData = (issues: Issue[]) => {
  return [getOpenIssueEventData(issues), getClosedIssueEventData(issues)];
};

const initEventHandler = (issues: Issue[]): void => {
  getIssueStatusEventData(issues).forEach(addClickEventListener);
};

export const IssueCount = ({ issues }: { issues: Issue[] }): void => {
  render(issues);
  initEventHandler(issues);
};
