import {getIssueItemTpl, getIssueTpl} from "./tpl.js";
import {pipe, tab} from "./helpers/fp-helpers.js";

export const htmlToElement = pipe(
  html => html.trim(),
  (html) => ({ele: document.createElement('template'), html}),
  tab(({ele, html}) => ele.innerHTML = html),
  ({ele}) => ele.content.firstChild
);

document.getElementById('app').innerHTML = getIssueTpl();
export const openedButtonElement = document.getElementsByClassName('open-count')[0];
export const closedButtonElement = document.getElementsByClassName('close-count')[0];
const issuesListElement = document.querySelector('.issue-list ul');

const appendIssueElement = (issueElement) => issuesListElement.appendChild(issueElement);
export const renderIssuesClear = () => issuesListElement.innerHTML = '';
export const renderOpenedNum = (openedNum) => openedButtonElement.innerText = openedNum + ' Opened';
export const renderClosedNum = (closedNum) => closedButtonElement.innerText = closedNum + ' Closed';
export const renderIssue = pipe(
  getIssueItemTpl,
  htmlToElement,
  appendIssueElement,
);
