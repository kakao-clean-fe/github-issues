import {getIssueTpl, getIssueItemTpl} from '../tpl';
import { querySelector } from './dom-selector';

export const setDefaultTemplate = (statusCount, $document = document) => {
  const htmlData = getIssueTpl(statusCount);
  const appElement = querySelector('#app', $document);
  appElement.innerHTML = htmlData;
}

export const setListTemplate = (issues, $document = document) => {
  const ULElement = querySelector('.issue-list>ul', $document);
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
