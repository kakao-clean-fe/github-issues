import { getLabelItemTpl } from '../tpl';
import { selectElement } from '../utils/dom';
import { SELECTOR } from '../constants/selector';

export const LabelList = class {

  constructor (labelData, parentElement) {
    this.labelData = labelData;
    this.parentElement = parentElement;

    this.initData();
  }

  get template () {
    const refinedLabelListTemplate = this.labelData.map(
      labelItem => getLabelItemTpl(labelItem)).join('');

    return refinedLabelListTemplate;
  }

  render () {
    this.initTemplate();
  }

  initData () {

  }

  initTemplate () {
    this.parentElement.innerHTML = this.template;
  }
}
