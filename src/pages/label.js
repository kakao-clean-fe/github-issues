import { getLabelTpl } from '../tpl';

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
