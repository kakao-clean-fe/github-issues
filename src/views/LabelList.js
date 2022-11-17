import { getLabelItemTpl } from '../tpl';
import { selectElement } from '../utils/dom';
import { SELECTOR } from '../constants/selector';

export const LabelList = class {

  get template () {
    const refinedLabelListTemplate = this.labelData.map(
      labelItem => getLabelItemTpl(labelItem)).join('');

    return refinedLabelListTemplate;
  }

  constructor (labelData) {
    this.parentElement = selectElement(SELECTOR.LABEL_LIST_TABLE);

    this.labelData = labelData;

    this.initData();
    this.initTemplate();
  }

  initData () {

  }

  initTemplate () {
    if (!this.parentElement) { return; }

    this.parentElement.innerHTML = this.template;
  }
}
