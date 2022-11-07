import { getIssueTpl, getIssueItemTpl } from '~/tpl.js';
import { getIssues } from '~/store/action';
import { findElement, findParentAndRenderInnerHtml, addClickEventListener } from '~/utils/dom';
import { filterArray, countArray } from '~/utils/array';
import { filterOpenedIssues, filterClosedIssues, makeIssueTemplate } from '~/utils/issue';
import { pipe } from '~/utils/functional-util';
import { ROOT_SELECTOR, ISSUE_CLOSE_COUNT_SELECTOR, ISSUE_LIST_SELECTOR, ISSUE_OPEN_COUNT_SELECTOR } from '~/constants/selector';
import type { Issue, Status } from '~/types/issue';

const renderIssueList = (issues: Issue[]): void => {
  findParentAndRenderInnerHtml({
    selector: ISSUE_LIST_SELECTOR,
    html: makeIssueTemplate({ issues, templateFunc: getIssueItemTpl })
  });
};

const countIssueStatus = ({ issues, status }: { issues: Issue[], status: Status }): number => {
  return pipe(
    filterArray,
    (arr) => countArray({ arr })
  )({ arr: issues, filterFunc: (issue) => issue.status === status });
};

const getIssueStatusCountData = ({ openCount, closeCount }: { openCount: number, closeCount: number }) => {
  return [
    { selector: ISSUE_OPEN_COUNT_SELECTOR, html: `${openCount} Opens` },
    { selector: ISSUE_CLOSE_COUNT_SELECTOR, html: `${closeCount} Closed` }
  ];
};

const renderIssueStatusCount = ({ openCount, closeCount }: { openCount: number, closeCount: number }): void => {
  getIssueStatusCountData({ openCount, closeCount })
    .forEach((findParentAndRenderInnerHtml));
};

export const getIssueStatusEventData = (issues: Issue[]) => {
  return [
    { selector: ISSUE_OPEN_COUNT_SELECTOR, eventHandler: () => pipe(filterOpenedIssues, renderIssueList)(issues) },
    { selector: ISSUE_CLOSE_COUNT_SELECTOR, eventHandler: () => pipe(filterClosedIssues, renderIssueList)(issues) }
  ];
};

const initIssueStatusEventHandler = (issues: Issue[]): void => {
  getIssueStatusEventData(issues).forEach(({ selector, eventHandler }) => {
    addClickEventListener({
      element: findElement({ selector }),
      eventHandler
    });
  });
};

const renderIssuePageTemplate = () => {
  findParentAndRenderInnerHtml({
    selector: ROOT_SELECTOR,
    html: getIssueTpl()
  });
};

const main = async () => {
  renderIssuePageTemplate();
  const issues: Issue[] = await getIssues();
  renderIssueList(filterOpenedIssues(issues));
  renderIssueStatusCount({
    openCount: countIssueStatus({ issues, status: 'open' }),
    closeCount: countIssueStatus({ issues, status: 'close' })
  });
  initIssueStatusEventHandler(issues);
};

main().catch((error) => { console.error(error); });
