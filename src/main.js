import {getIssueTpl, getIssueItemTpl} from './tpl.js';
import {htmlToElement, pipe, removeChildren, createAppendChild, createIssueStatus} from './utils.js';
import {OPEN, CLOSE, UL_SELECTOR, OPEN_BUTTON_SELECTOR, CLOSE_BUTTON_SELECTOR} from './const.js';
import * as Request from './requests.js';

window.addEventListener('DOMContentLoaded', async function () {
  const app = document.getElementById('app');
  const div = document.createElement('div');
  div.innerHTML = getIssueTpl();
  app.appendChild(div);

  const appendToUlFunction = createAppendChild(UL_SELECTOR);
  const appendIssue = (item) => pipe(getIssueItemTpl, htmlToElement, appendToUlFunction)(item);

  try {
    const items = await Request.get(`/data-sources/issues.json`);
    const isOpenFn = createIssueStatus(OPEN);
    const isClosedFn = createIssueStatus(CLOSE);

    items.filter(isOpenFn).map(item => appendIssue(item));

    const opensButton = document.querySelector(OPEN_BUTTON_SELECTOR);
    const closedButton = document.querySelector(CLOSE_BUTTON_SELECTOR);

    const openIssuesCount = items.filter(isOpenFn).length;
    const closedIssuesCount = items.filter(isClosedFn).length;

    opensButton.textContent = `${openIssuesCount} Open`;
    closedButton.textContent = `${closedIssuesCount} Closed`;

    // event handler
    opensButton.addEventListener('click', () => {
      removeChildren(document.querySelector(UL_SELECTOR));
      items.filter(isOpenFn).map(appendIssue);
    });
    // event handler
    closedButton.addEventListener('click', () => {
      removeChildren(document.querySelector(UL_SELECTOR));
      items.filter(isClosedFn).map(appendIssue);
    });
  } catch (err) {
    console.error(err);
  }
});
