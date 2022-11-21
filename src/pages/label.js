import { getLabelTpl } from '../tpl';
import { createApp } from '../utils/template';
import { LabelList } from '../views/LabelList';
import { selectElement, toggleClass } from '../utils/dom';
import { SELECTOR } from '../constants/selector';
import { EVENT } from '../constants/event';
import { LabelCreator } from '../views/LabelCreator';
import { HIDDEN } from '../constants/status';
import { fetchData } from '../common/api';
import { LABELS_DELAY_URL } from '../constants/api';

let controller;

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
    this.onClickUpdateLabels();
  }

  toggleLabelCreator () {
    toggleClass(SELECTOR.LABEL_CREATOR, HIDDEN);
  }

  onClickNewLabel () {
    const newLabelButton = selectElement(SELECTOR.NEW_LABEL_BUTTON);
    newLabelButton.addEventListener(EVENT.CLICK, this.toggleLabelCreator)
  }

  updateLabelData () {
    controller = new AbortController();
    const signal = controller.signal;

    fetchData(LABELS_DELAY_URL, {
      method: 'GET',
      signal,
    }).catch(error => {
      // console.log(`Update error ${error}`)
    });
  }

  onClickUpdateLabels () {
    selectElement(SELECTOR.UPDATE_LABEL_BUTTON).addEventListener(EVENT.CLICK, () => {
      if (controller) {
        controller.abort();
        console.log('Abort Update Labels');
      }
      this.updateLabelData();
    });
  }
}
