import { getLabelTpl } from '../tpl';
import { createApp } from '../utils/template';
import { LabelList } from '../views/LabelList';
import { selectElement, toggleClass } from '../utils/dom';
import { SELECTOR } from '../constants/selector';
import { EVENT } from '../constants/event';
import { LabelCreator } from '../views/LabelCreator';
import { HIDDEN } from '../constants/status';

export const LabelPage = class {

  constructor (labelData) {
    this.labelData = labelData;

    this.initTemplate();
    this.initLabelChildrenView();
  }

  get template () {
    return getLabelTpl();
  }

  initTemplate () {
    createApp(this.template);
  }

  initLabelChildrenView () {
    const labelList = new LabelList(this.labelData);
    const labelCreator = new LabelCreator();

    this.initEvent();
  }

  initEvent () {
    this.onClickNewLabel();
  }

  toggleLabelCreator () {
    toggleClass(SELECTOR.LABEL_CREATOR, HIDDEN);
  }

  onClickNewLabel () {
    const newLabelButton = selectElement(SELECTOR.NEW_LABEL_BUTTON);
    newLabelButton.addEventListener(EVENT.CLICK, this.toggleLabelCreator)
  }
}
