import { getIssueTpl, getIssueItemTpl } from '~/tpl.js';
import { getIssues } from '~/store/action';

document.querySelector('#app').innerHTML = getIssueTpl();

const renderIssueList = async () => {
  const issues = await getIssues();
  const issuesTemplate = issues.reduce((template, issue) => {
    return template + getIssueItemTpl(issue);
  }, '');

  document.querySelector('.issue-list > ul').innerHTML = issuesTemplate;
};

renderIssueList();
