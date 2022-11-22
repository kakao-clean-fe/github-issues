import { go } from '../fp';
import { setInnerHTML, setInnerText, setEvent } from '../curry/dom';
import { $, saveCreateFormBeforeUnload } from '../util';
import { getLabelTpl, getLabelItemTpl } from '../tpl';
import { selector as sel, storeKey, pageType } from '../constant';
import { createNewLabelForm } from './NewLabelForm';
import { fetchLabelsWithDelay } from '../service';

export function createLabelPage({ store }) {
  const [labels, setLabels] = store.useState(storeKey.labels);
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
  function renderUpdateLabelsButton() {
    go(
      $(sel.updateLabelsButton),
      setEvent('click', () => {
        fetchLabelsWithDelay().then(setLabels);
      })
    )
  }
  function handlePageChange(event) {
    const [labels] = store.useState(storeKey.labels);
    if (event.detail === pageType.label) {
      renderLabelLayout();
      renderLabels(labels);
      renderLabelCount(labels);
      renderUpdateLabelsButton();
      newLabelForm.render();
    }
  }
  function render() {
    const [page] = store.useState(storeKey.page);
    if (page === pageType.label) {
      renderLabelLayout();
      renderLabels(labels);
      renderLabelCount(labels);
      renderUpdateLabelsButton();
      newLabelForm.render();
    }
    saveCreateFormBeforeUnload(store);
    store.useEffect(storeKey.page, handlePageChange);
  }

  return { render };
}
