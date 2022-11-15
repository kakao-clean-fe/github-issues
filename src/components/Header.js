import { pipe } from '../fp';
import { setEvent } from '../curry/dom';
import { storeKey, pageType } from '../constant';
import { $ } from '../util';
import { selector as sel } from '../constant';

export function createHeader({ store }) {
  const [, setPage] = store.useState(storeKey.page, pageType.issue);
  const renderIssueTab = pipe(setEvent('click', () => setPage(pageType.issue)));
  const renderLabelTab = pipe(setEvent('click', () => setPage(pageType.label)));

  function render() {
    renderIssueTab($(sel.issueTab));
    renderLabelTab($(sel.labelTab));
  }

  return { render };
}
