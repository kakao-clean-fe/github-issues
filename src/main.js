import { getIssueTpl, getIssueItemTpl } from './tpl';
import { curry, go, filter, map } from './fp';

let $app = null;
let $issueList = null;
let $openCount = null;
let $closeCount = null;
let issueData = null;

function init() {
  $app = document.getElementById('app');
  $app.innerHTML = getIssueTpl();
  $issueList = document.querySelector('.issue-list ul');
  $openCount = document.querySelector('.statusTab .open-count');
  $closeCount = document.querySelector('.statusTab .close-count');
}

async function fetchData(...nameList) {
  const arr = await Promise.all(
    nameList
      .map(async (name) => {
        return await (await fetch(`/data-sources/${name}.json`)).json();
      })
  );
  return arr;
}

const setHTML = curry((dom, html) => {
  dom.innerHTML = html;
  return dom;
});

function renderIssue(issues) {
  go(
    issues,
    map(issue => getIssueItemTpl(issue)),
    issue => issue.join(''),
    setHTML($issueList)
  )
}

function filterIssue(status) {
  return go(
    issueData,
    filter(issue => issue.status === status)
  );
}

async function main() {
  init();

  // Data Fetch
  [issueData] = await fetchData('issues');

  const openIssueCount = filterIssue('open').length;
  const closeIssueCount = filterIssue('close').length;

  // Set HTML
  $openCount.innerHTML = `${openIssueCount} Opens`;
  $closeCount.innerHTML = `${closeIssueCount} Closed`;

  renderIssue(issueData);

  // ClickEvent
  $openCount.addEventListener('click', () => {
    renderIssue(filterIssue('open'));
    $openCount.classList.add('font-bold');
    $closeCount.classList.remove('font-bold');
  });
  $closeCount.addEventListener('click', () => {
    renderIssue(filterIssue('close'));
    $closeCount.classList.add('font-bold');
    $openCount.classList.remove('font-bold');
  });
}

main();