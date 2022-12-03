import { go } from '../fp';
import { setInnerHTML, setInnerText, setEvent } from '../curry/dom';
import { $, saveCreateFormBeforeUnload } from '../util';
import { getLabelTpl, getLabelItemTpl } from '../components/Templates';
import { selector as sel, pageType } from '../constant';
import { createNewLabelForm } from './NewLabelForm';
import { fetchLabelsWithDelay } from '../service';
import { Component } from './Component';

export class LabelPage extends Component {
  constructor({ store, $root }) {
    super({ store, $root });
  }
  beforeMounted() {
    this.labels = this.store.getState(state => state.labels);
    this.newLabelForm = createNewLabelForm({ store: this.store });
  }
  render(template = this.getTemplate()) {
    go(this.$root, setInnerHTML(template));
  }
  afterRender() {
    this.renderLabels = (labelList) => go($(sel.labelList),
      setInnerHTML(labelList.map(getLabelItemTpl).join(''))
    );
    this.renderLabelCount = (labelList) => go($(sel.labelCount),
      setInnerText(`${labelList.length} Labels`)
    );
    this.renderUpdateLabelsButton = () => go($(sel.updateLabelsButton),
      setEvent('click', () => fetchLabelsWithDelay().then(setLabels))
    );
    this.renderLabelComponents = (labels) => {
      this.renderLabels(labels);
      this.renderLabelCount(labels);
      this.renderUpdateLabelsButton();
      this.newLabelForm.render();
    }
  }
  hydrate() {
    const labels = this.store.getState(state => state.labels);
    this.renderLabelComponents(labels);
    this.store.addActionListener(this.handlePageChange.bind(this), actionNames => [actionNames.setPage]);
    saveCreateFormBeforeUnload(this.store);
  }
  getTemplate() {
    return getLabelTpl();
  }

  handlePageChange(state) {
    if (state.page === pageType.label) {
      this.reRender();
    }
  }
}
