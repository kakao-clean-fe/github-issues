import { fetchIssues } from './service';
import { getIssueItemTpl, getIssueTpl } from './tpl';
import { selector as sel } from './constant';
import { isOpenedIssue, isClosedIssue } from './util';

const issues = await fetchIssues();
const $app = document.querySelector(sel.app);

$app.innerHTML = getIssueTpl();

const $issueList = document.querySelector(sel.issueList);
const $openedButton = document.querySelector(sel.openedButton);
const $closedButton = document.querySelector(sel.closedButton);

$issueList.innerHTML = issues
  .filter(isOpenedIssue)
  .map(getIssueItemTpl)
  .join('');

$openedButton.innerText = `${issues.filter(isOpenedIssue).length} Opend`;
$closedButton.innerText = `${issues.filter(isClosedIssue).length} Closed`;

$openedButton.addEventListener('click', () => {
  $issueList.innerHTML = issues
    .filter(isOpenedIssue)
    .map(getIssueItemTpl)
    .join('');
  $openedButton.classList.add('font-bold');
  $closedButton.classList.remove('font-bold');
});

$closedButton.addEventListener('click', () => {
  $issueList.innerHTML = issues
    .filter(isClosedIssue)
    .map(getIssueItemTpl)
    .join('');
  $closedButton.classList.add('font-bold');
  $openedButton.classList.remove('font-bold');
});
