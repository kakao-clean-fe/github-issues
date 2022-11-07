import {getIssueTpl, getIssueItemTpl} from '../tpl';

export const setDefaultTemplate = (statusCount) => {
  const htmlData = getIssueTpl(statusCount);
  const appElement = document.querySelector('#app');
  appElement.innerHTML = htmlData;
}

export const setListTemplate = (issues) => {
  const ULElement = document.querySelector('.issue-list>ul');
  let innerHTML = '';
  issues.forEach(issue => {
    innerHTML += getIssueItemTpl(issue);
  });
  ULElement.innerHTML = innerHTML;
}