import { getLabelTpl } from '../tpl';
import { createApp } from '../utils/template';
import { LabelList } from '../views/LabelList';
import { selectElement, toggleClass } from '../utils/dom';
import { SELECTOR } from '../constants/selector';
import { EVENT } from '../constants/event';
import { HIDDEN } from '../constants/status';
import { updateLabelData } from '../common/api';
import { setLabelData } from '../store/dataStore';

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

    this.initEvent();
  }

  async initLabelCreatorView () {
    const { LabelCreator } = await import('../views/LabelCreator');
    const labelCreator = new LabelCreator();
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
    newLabelButton.addEventListener(EVENT.CLICK, async () => {
      await this.initLabelCreatorView();
    });
  }

  onClickUpdateLabels () {
    selectElement(SELECTOR.UPDATE_LABEL_BUTTON).addEventListener(EVENT.CLICK, async () => {
      await updateLabelData();
    });
  }
}
