import { getIssueTpl, getIssueItemTpl } from '~/tpl.js';
import { getIssues } from '~/store/action';
import { findElement } from '~/utils/dom';
import { ROOT_SELECTOR, ISSUE_CLOSE_COUNT_SELECTOR, ISSUE_LIST_SELECTOR, ISSUE_OPEN_COUNT_SELECTOR } from '~/constants/selector';
import type { Issue, Status } from '~/types/issue';

const renderIssueList = (issues: Issue[]): void => {
  const issuesTemplate = issues.reduce((template, issue) => {
    return `${template}${getIssueItemTpl(issue)}`;
  }, '');

  const $issueListParent = findElement({ selector: ISSUE_LIST_SELECTOR });
  if ($issueListParent != null) {
    $issueListParent.innerHTML = issuesTemplate;
  }
};

const countIssueStatus = ({ issues, status }: { issues: Issue[], status: Status }): number => {
  return issues
    .filter((issue) => issue.status === status)
    .length;
};

const renderIssueStatusCount = ({ openCount, closeCount }: { openCount: number, closeCount: number }): void => {
  const $openCount = findElement({ selector: ISSUE_OPEN_COUNT_SELECTOR });
  const $closeCount = findElement({ selector: ISSUE_CLOSE_COUNT_SELECTOR });

  if ($openCount != null) {
    $openCount.innerHTML = `${openCount} Opens`;
  }
  if ($closeCount != null) {
    $closeCount.innerHTML = `${closeCount} Closed`;
  }
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
  return issues.filter((issue) => issue.status === status);
};

const main = async () => {
  const $app = findElement({ selector: ROOT_SELECTOR });
  if ($app != null) {
    $app.innerHTML = getIssueTpl();
  }
  const issues: Issue[] = await getIssues();
  renderIssueList(filterIssueByStatus({ issues, status: 'open' }));
  renderIssueStatusCount({
    openCount: countIssueStatus({ issues, status: 'open' }),
    closeCount: countIssueStatus({ issues, status: 'close' })
  });
  initIssueStatusEventHandler(issues);
};

main().catch((error) => { console.error(error); });
