import { fetchIssues } from './service';
import { getIssueItemTpl, getIssueTpl } from './tpl';
import { selector as sel } from './constant';
import { $, isOpenedIssue, isClosedIssue } from './util';
import { pipe } from './fp';
import {
  setInnerHTML,
  setInnerText,
  setEvent,
  addClass,
  removeClass,
} from './curry/dom';

async function App() {
  const issues = await fetchIssues();
  const openedIssues = issues.filter(isOpenedIssue);
  const closedIssues = issues.filter(isClosedIssue);

  const makeTextBold = pipe(addClass('font-bold'));
  const makeTextThin = pipe(removeClass('font-bold'));
  const renderLayout = pipe(setInnerHTML(getIssueTpl()));
  const renderOpenedIssues = pipe(
    setInnerHTML(openedIssues.map(getIssueItemTpl).join(''))
  );
  const renderClosedIssues = pipe(
    setInnerHTML(closedIssues.map(getIssueItemTpl).join(''))
  );
  const renderOpenedButton = pipe(
    setInnerText(`${openedIssues.length} Opened`),
    setEvent('click', () => {
      makeTextBold($(sel.openedButton));
      makeTextThin($(sel.closedButton));
      renderOpenedIssues($(sel.issueList));
    })
  );
  const renderClosedButton = pipe(
    setInnerText(`${closedIssues.length} Closed`),
    setEvent('click', () => {
      makeTextBold($(sel.closedButton));
      makeTextThin($(sel.openedButton));
      renderClosedIssues($(sel.issueList));
    })
  );

  function render() {
    renderLayout($(sel.app));
    renderOpenedIssues($(sel.issueList));
    renderOpenedButton($(sel.openedButton));
    renderClosedButton($(sel.closedButton));
  }

  return { render };
}

const app = await App();
window.addEventListener('DOMContentLoaded', app.render());
