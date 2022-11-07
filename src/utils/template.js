import { addClass, renderElement, selectElement } from './dom';
import { getIssueItemTpl, getIssueTpl } from '../tpl';
import { SELECTOR } from '../constants/selector';
import { OPEN } from '../constants/status';

/** 템플릿 생성 */
export const createIssue = renderElement(SELECTOR.APP);
export const createIssueList = renderElement(SELECTOR.ISSUE_LIST_TABLE);

export const updateIssuesTemplate = (openIssueCount, closedIssueCount, clickedStatus) => createIssue(getIssueTpl({openIssueCount, closedIssueCount, clickedStatus}));
export const getIssueListTableTemplate = issues => issues.map(issue => getIssueItemTpl(issue)).join('');
export const updateIssueList = (issues) => createIssueList(getIssueListTableTemplate(issues));
export const boldToStatusButton = status => {
  const boldToElement = addClass('font-bold');
  status === OPEN ? boldToElement(SELECTOR.OPEN_COUNT_BUTTON) : boldToElement(SELECTOR.CLOSED_COUNT_BUTTON);
};
