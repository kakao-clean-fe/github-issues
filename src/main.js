import { getIssueItemTpl, getIssueTpl, getLabelItemTpl, getLabelTpl } from './tpl';
import { fetchIssues, fetchLabels } from './common/api';
import { renderElement, selectElement } from './utils/render';
import { OPEN, CLOSED } from './constants/status';
import { SELECTOR } from './constants/selector';
import { EVENT } from './constants/event';
import { bindEvent, setEventListener } from './utils/event';
import { getIssuesWithStatus } from './utils/status';
import { createIssue, createIssueList } from './utils/template';



const issues = await fetchIssues();
const openIssues = getIssuesWithStatus(issues, OPEN);
const closedIssues = getIssuesWithStatus(issues, CLOSED);

const openIssueCount = openIssues.length;
const closedIssueCount = closedIssues.length;
const getIssueListTableTemplate = issues => issues.map(issue => getIssueItemTpl(issue)).join('');

createIssue(getIssueTpl({openIssueCount, closedIssueCount}));
setEventListener(issues);
createIssueList(getIssueListTableTemplate(issues));






