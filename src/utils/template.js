import {getIssueTpl, getIssueItemTpl} from '../tpl';
import { querySelector } from './dom-selector';

export const setDefaultTemplate = ($document = document, statusCount) => {
  const htmlData = getIssueTpl(statusCount);
  const appElement = querySelector($document, '#app');
  appElement.innerHTML = htmlData;
}

export const setListTemplate = ($document = document, issues) => {
  const ULElement = querySelector($document, '.issue-list>ul');
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
