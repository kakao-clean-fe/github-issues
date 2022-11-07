import { getIssueTpl, getIssueItemTpl } from '~/tpl.js';
import { getIssues } from '~/store/action';
import { findElement, findParentAndRenderInnerHtml } from '~/utils/dom';
import { filterArray, countArray } from '~/utils/array';
import { pipe } from '~/utils/functional-util';
import { ROOT_SELECTOR, ISSUE_CLOSE_COUNT_SELECTOR, ISSUE_LIST_SELECTOR, ISSUE_OPEN_COUNT_SELECTOR } from '~/constants/selector';
import type { Issue, Status } from '~/types/issue';

const renderIssueList = (issues: Issue[]): void => {
  const issuesTemplate = issues.reduce((template, issue) => {
    return `${template}${getIssueItemTpl(issue)}`;
  }, '');

  findParentAndRenderInnerHtml({
    selector: ISSUE_LIST_SELECTOR,
    html: issuesTemplate
  });
};

const countIssueStatus = ({ issues, status }: { issues: Issue[], status: Status }): number => {
  return pipe(
    filterArray,
    (arr) => countArray({ arr })
  )({ arr: issues, filterFunc: (issue) => issue.status === status });
};

const renderIssueStatusCount = ({ openCount, closeCount }: { openCount: number, closeCount: number }): void => {
  findParentAndRenderInnerHtml({
    selector: ISSUE_OPEN_COUNT_SELECTOR,
    html: `${openCount} Opens`
  });
  findParentAndRenderInnerHtml({
    selector: ISSUE_CLOSE_COUNT_SELECTOR,
    html: `${closeCount} Closed`
  });
};

const initIssueStatusEventHandler = (issues: Issue[]): void => {
  const $openCount = findElement({ selector: ISSUE_OPEN_COUNT_SELECTOR });
  const $closeCount = findElement({ selector: ISSUE_CLOSE_COUNT_SELECTOR });

  if (($openCount == null) || ($closeCount == null)) {
    return;
  }

  $openCount.addEventListener('click', () => {
    renderIssueList(filterIssueByStatus({ issues, status: 'open' }));
  });
  $closeCount.addEventListener('click', () => {
    renderIssueList(filterIssueByStatus({ issues, status: 'close' }));
  });
};

const filterIssueByStatus = ({ issues, status }: { issues: Issue[], status: Status }): Issue[] => {
  return filterArray({ arr: issues, filterFunc: (issue) => issue.status === status });
};

const main = async () => {
  findParentAndRenderInnerHtml({
    selector: ROOT_SELECTOR,
    html: getIssueTpl()
  });
  const issues: Issue[] = await getIssues();
  renderIssueList(filterIssueByStatus({ issues, status: 'open' }));
  renderIssueStatusCount({
    openCount: countIssueStatus({ issues, status: 'open' }),
    closeCount: countIssueStatus({ issues, status: 'close' })
  });
  initIssueStatusEventHandler(issues);
};

main().catch((error) => { console.error(error); });
