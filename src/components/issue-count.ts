import { findParentAndRenderInnerHtml, findElement, addClickEventListener, toggleClass } from '~/utils/dom';
import { filterArray, countArray } from '~/utils/array';
import { pipe } from '~/utils/functional-util';
import { ISSUE_CLOSE_COUNT_SELECTOR, ISSUE_OPEN_COUNT_SELECTOR } from '~/constants/selector';
import { filterOpenedIssues, filterClosedIssues } from '~/utils/issue';
import { IssueList } from './issue-list';
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
    { selector: ISSUE_OPEN_COUNT_SELECTOR, html: `${countIssueStatus({ issues, status: 'open' })} Opens` },
    { selector: ISSUE_CLOSE_COUNT_SELECTOR, html: `${countIssueStatus({ issues, status: 'close' })} Closed` }
  ];
};

const render = (issues: Issue[]): void => {
  getIssueStatusCountData(issues)
    .forEach((findParentAndRenderInnerHtml));
};

// 이벤트 핸들러
const setActiveFilterStyle = () => {
  const style = 'font-bold';
  toggleClass(findElement({ selector: ISSUE_OPEN_COUNT_SELECTOR }), style);
  toggleClass(findElement({ selector: ISSUE_CLOSE_COUNT_SELECTOR }), style);
};

const getIssueStatusEventData = (issues: Issue[]) => {
  return [
    {
      selector: ISSUE_OPEN_COUNT_SELECTOR,
      eventHandler: () => {
        pipe(filterOpenedIssues, (issues: Issue[]) => IssueList({ issues }))(issues);
        setActiveFilterStyle();
      }
    },
    {
      selector: ISSUE_CLOSE_COUNT_SELECTOR,
      eventHandler: () => {
        pipe(filterClosedIssues, (issues: Issue[]) => IssueList({ issues }))(issues);
        setActiveFilterStyle();
      }
    }
  ];
};

const initEventHandler = (issues: Issue[]): void => {
  getIssueStatusEventData(issues).forEach(({ selector, eventHandler }) => {
    addClickEventListener({
      element: findElement({ selector }),
      eventHandler
    });
  });
};

export const IssueCount = ({ issues }: { issues: Issue[] }): void => {
  render(issues);
  initEventHandler(issues);
};
