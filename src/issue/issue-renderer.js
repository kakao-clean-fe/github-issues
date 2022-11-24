import { pipe } from "../helpers/fp-helpers.js";
import { $, htmlToElement } from "../helpers/render-helpers.js";
import { getIssueItemTpl, getIssueTpl } from "../helpers/tpl.js";

$("app").innerHTML = getIssueTpl();
export const openedButtonElement = $("open-issues-count");
export const closedButtonElement = $("closed-issues-count");
const issuesListElement = document.querySelector(".issue-list ul");

const appendIssueElement = (issueElement) =>
  issuesListElement.appendChild(issueElement);
export const renderIssuesClear = () => (issuesListElement.innerHTML = "");
export const renderOpenedNum = (openedNum) =>
  (openedButtonElement.innerText = openedNum + " Opened");
export const renderClosedNum = (closedNum) =>
  (closedButtonElement.innerText = closedNum + " Closed");
export const renderIssue = pipe(
  getIssueItemTpl,
  htmlToElement,
  appendIssueElement
);
