import { go } from '../fp';
import { setInnerHTML, setInnerText } from '../curry/dom';
import { $ } from '../util';
import { getLabelTpl, getLabelItemTpl } from '../tpl';
import { selector as sel, storeKey, pageType } from '../constant';
import { createNewLabelForm } from './NewLabelForm';

export function createLabelPage({ store }) {
  const [labels] = store.useState(storeKey.labels);
  const newLabelForm = createNewLabelForm({ store });

  function renderLabelLayout() {
    go($(sel.app), setInnerHTML(getLabelTpl()));
  }
  function renderLabels(labelList) {
    go($(sel.labelList), setInnerHTML(labelList.map(getLabelItemTpl).join('')));
  }
  function renderLabelCount(labelList) {
    go($(sel.labelCount), setInnerText(`${labelList.length} Labels`));
  }
  function handlePageChange(event) {
    const [labels] = store.useState(storeKey.labels);
    if (event.detail === pageType.label) {
      renderLabelLayout();
      renderLabels(labels);
      renderLabelCount(labels);
      newLabelForm.render();
    }
  }
  function render() {
    renderLabelLayout();
    renderLabels(labels);
    renderLabelCount(labels);
    newLabelForm.render();
    store.useEffect(storeKey.page, handlePageChange);
  }

  return { render };
}
