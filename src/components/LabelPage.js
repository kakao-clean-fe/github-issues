import { pipe } from '../fp';
import { setInnerHTML } from '../curry/dom';
import { $ } from '../util';
import { getLabelTpl, getLabelItemTpl } from '../tpl';
import { selector as sel, storeKey, pageType } from '../constant';

export function renderLabelPage({ store }) {
  const [labels, setLabels] = store.useState(storeKey.labels);

  const renderLabelLayout = pipe(setInnerHTML(getLabelTpl()));
  const renderLabels = pipe(setInnerHTML(labels.map(getLabelItemTpl).join('')));

  function render() {
    renderLabelLayout($(sel.app));
    renderLabels($(sel.labelList));
  }
  function handlePageChange(event) {
    const targetPage = event.detail;
    if (targetPage === pageType.label) {
      render();
    }
  }
  store.useEffect(storeKey.page, handlePageChange);
}
