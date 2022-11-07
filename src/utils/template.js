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
/**
 * 
 * @param {Element[]} statusButtons
 * @param {Element} target 
 */
export const setButtonTemplate = (statusButtons, target = null) => {
  statusButtons.forEach(statusBtn => statusBtn.classList.remove('font-bold'));
  if(target){
    target.classList.add('font-bold');
  }
}
