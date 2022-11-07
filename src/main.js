import { getIssueItemTpl, getIssueTpl, getLabelItemTpl, getLabelTpl } from './tpl';
import { fetchIssues } from './common/api';
import { OPEN, CLOSED } from './constants/status';
import { SELECTOR } from './constants/selector';
import { EVENT } from './constants/event';
import { getIssuesWithStatus } from './utils/status';
import { createIssue, createIssueList, updateIssuesTemplate, updateIssueList } from './utils/template';
import { selectAllElement } from './utils/render';



const issues = await fetchIssues();
const openIssues = getIssuesWithStatus(issues, OPEN);
const closedIssues = getIssuesWithStatus(issues, CLOSED);

const openIssueCount = openIssues.length;
const closedIssueCount = closedIssues.length;
const getIssueListTableTemplate = issues => issues.map(issue => getIssueItemTpl(issue)).join('');

createIssue(getIssueTpl({openIssueCount, closedIssueCount}));

const elements = selectAllElement(SELECTOR.STATUS_TAB);
const OPEN_COUNT_CLASS = '_open_count'
elements.forEach(element => {
  element.addEventListener(EVENT.CLICK, e => {
    const status = e.target.classList.contains(OPEN_COUNT_CLASS) ? OPEN : CLOSED;
    const clickedIssues = getIssuesWithStatus(issues, status);
    const openIssueCount = getIssuesWithStatus(issues, OPEN).length;
    const closedIssueCount = getIssuesWithStatus(issues, CLOSED).length;
    updateIssuesTemplate(openIssueCount, closedIssueCount, status);
    updateIssueList(clickedIssues);
  });
});

createIssueList(getIssueListTableTemplate(issues));






