import { getLabelTpl } from '../tpl';
import { createApp } from '../utils/template';
import { LabelList } from '../views/LabelList';
import { selectElement, toggleClass } from '../utils/dom';
import { SELECTOR } from '../constants/selector';
import { EVENT } from '../constants/event';
import { HIDDEN } from '../constants/status';
import { updateLabelData } from '../common/api';

export const LabelPage = class {
  labelData = null;
  parentElement = null;
  labelListView = null;

  constructor (labelData, parentElement) {
    this.labelData = labelData;
    this.parentElement = parentElement;
  }

  get template () {
    return getLabelTpl();
  }

  render () {
    this.initTemplate();
    this.initLabelChildrenView();
  }

  initTemplate () {
    this.parentElement.innerHTML = this.template;
  }

  initLabelChildrenView () {
    const labelListTable = selectElement(SELECTOR.LABEL_LIST_TABLE, this.parentElement);
    this.labelListView = new LabelList(this.labelData, labelListTable);
    this.labelListView.render();

    this.initEvent();
  }

  async initLabelCreatorView () {
    const { LabelCreator } = await import('../views/LabelCreator');
    const labelCreatorWrapperElement = selectElement(SELECTOR.LABEL_CREATOR_WRAPPER);
    const labelCreator = new LabelCreator(labelCreatorWrapperElement);
  }

  initEvent () {
    this.onClickNewLabel();
    this.onClickUpdateLabels();
  }

  toggleLabelCreator () {
    toggleClass(SELECTOR.LABEL_CREATOR, HIDDEN);
  }

  onClickNewLabel () {
    const newLabelButton = selectElement(SELECTOR.NEW_LABEL_BUTTON, this.parentElement);
    newLabelButton.addEventListener(EVENT.CLICK, () => {
      this.initLabelCreatorView();
    });
  }

  onClickUpdateLabels () {
    selectElement(SELECTOR.UPDATE_LABEL_BUTTON, this.parentElement).addEventListener(EVENT.CLICK, () => {
      updateLabelData();
    });
  }
}
