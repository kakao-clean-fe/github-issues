import { renderElement } from './render';
import { getIssueItemTpl, getIssueTpl } from '../tpl';
import { SELECTOR } from '../constants/selector';

/** 템플릿 생성 */
export const createIssue = renderElement(SELECTOR.APP);
export const createIssueList = renderElement(SELECTOR.ISSUE_LIST_TABLE);

export const updateIssuesTemplate = (openIssueCount, closedIssueCount, clickedStatus) => createIssue(getIssueTpl({openIssueCount, closedIssueCount, clickedStatus}));
export const getIssueListTableTemplate = issues => issues.map(issue => getIssueItemTpl(issue)).join('');
export const updateIssueList = (issues) => createIssueList(getIssueListTableTemplate(issues));
