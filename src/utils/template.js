import { addClass, renderElement, removeClass } from './dom';
import { getIssueItemTpl, getIssueTpl } from '../tpl';
import { SELECTOR } from '../constants/selector';
import { OPEN } from '../constants/status';

export const createApp = renderElement(SELECTOR.APP);

export const createIssueList = renderElement(SELECTOR.ISSUE_LIST_TABLE);

export const updateIssuesTemplate = (openIssueCount, closedIssueCount, clickedStatus) => createApp(getIssueTpl({openIssueCount, closedIssueCount, clickedStatus}));

export const getIssueListTableTemplate = issues => issues.map(issue => getIssueItemTpl(issue)).join('');

export const updateIssueList = (issues) => createIssueList(getIssueListTableTemplate(issues));

export const boldToStatusButton = status => {
  const FONT_BOLD = 'font-bold';
  const boldToElement = addClass(FONT_BOLD);
  const removeBoldAtElement = removeClass(FONT_BOLD);
  if (status === OPEN) {
    boldToElement(SELECTOR.OPEN_COUNT_BUTTON);
    removeBoldAtElement(SELECTOR.CLOSED_COUNT_BUTTON);
  } else {
    boldToElement(SELECTOR.CLOSED_COUNT_BUTTON);
    removeBoldAtElement(SELECTOR.OPEN_COUNT_BUTTON);
  }
};
