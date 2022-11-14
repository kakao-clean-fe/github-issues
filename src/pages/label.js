import { getLabelTpl } from '../tpl';
import { createApp } from '../utils/template';
import { LabelList } from '../views/LabelList';
import { fetchLabelsData } from '../common/api';

export const LabelPage = class {

  get template () {
    return getLabelTpl();
  }

  constructor (labelData) {
    this.labelData = labelData;

    this.initTemplate();
    this.initLabelList();
  }

  async initData () {
    this.labelData = await fetchLabelsData();
  }

  initTemplate () {
    createApp(this.template);
  }

  initLabelList () {
    new LabelList(this.labelData);
  }
}
