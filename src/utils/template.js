import {getIssueTpl, getIssueItemTpl} from '../tpl';
import { querySelector } from './dom-selector';

export const setDefaultTemplate = (statusCount) => {
  const htmlData = getIssueTpl(statusCount);
  const appElement = querySelector('#app');
  appElement.innerHTML = htmlData;
}

export const setListTemplate = (issues) => {
  const ULElement = querySelector('.issue-list>ul');
  const innerHTML = issues.reduce((preValue, currValue) => preValue + getIssueItemTpl(currValue), '');
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
export const convertElement = (templateStr) => {
  const div = document.createElement('div');
  div.innerHTML = templateStr.trim();
  return div.firstChild;
}

