import { getLabelTpl } from '../tpl';
import { createApp } from '../utils/template';

export const LabelPage = class {

  get template () {
    return getLabelTpl();
  }

  constructor () {

    this.initTemplate();
  }

  initData () {

  }

  initTemplate () {
    createApp(this.template);
  }
}
