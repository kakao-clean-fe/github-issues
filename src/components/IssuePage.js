import { pipe } from '../fp';
import {
  setInnerHTML,
  setInnerText,
  setEvent,
  addClass,
  removeClass,
} from '../curry/dom';
import { $, isClosedIssue, isOpenedIssue } from '../util';
import { getIssueItemTpl, getIssueTpl } from '../tpl';
import { selector as sel, storeKey, pageType } from '../constant';

export function createIssuePage({ store }) {
  const [issues] = store.useState(storeKey.issues);
  const openedIssues = issues.filter(isOpenedIssue);
  const closedIssues = issues.filter(isClosedIssue);

  const makeTextBold = pipe(addClass('font-bold'));
  const makeTextThin = pipe(removeClass('font-bold'));
  const renderIssueLayout = pipe(setInnerHTML(getIssueTpl()));
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
  function handlePageChange (event) {
    const targetPage = event.detail;
    if (targetPage === pageType.issue) {
      render();
    }
  }
  function render() {
    renderIssueLayout($(sel.app));
    renderOpenedIssues($(sel.issueList));
    renderOpenedButton($(sel.openedButton));
    renderClosedButton($(sel.closedButton));
    store.useEffect(storeKey.page, handlePageChange);
  }

  return { render }
}
