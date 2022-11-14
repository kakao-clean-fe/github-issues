import { getLabelTpl } from '../tpl';
import { createApp } from '../utils/template';
import { LabelList } from '../views/LabelList';
import { selectElement, removeClass } from '../utils/dom';
import { SELECTOR } from '../constants/selector';
import { EVENT } from '../constants/event';
import { LabelCreator } from '../views/LabelCreator';
import { HIDDEN } from '../constants/status';

export const LabelPage = class {
  get template () {
    return getLabelTpl();
  }

  constructor (labelData) {
    this.labelData = labelData;

    this.initTemplate();
    this.initLabelList();
  }

  initTemplate () {
    createApp(this.template);
  }

  initLabelList () {
    new LabelList(this.labelData);
    new LabelCreator();

    this.initEvent();
  }

  initEvent () {
    this.onClickNewLabel();
  }

  onClickNewLabel () {
    const newLabelButton = selectElement(SELECTOR.NEW_LABEL_BUTTON);
    newLabelButton.addEventListener(EVENT.CLICK, () => {
      // TODO: label creator 토글 메서드 함수형 유틸로 개선
      const removeHiddenClass = removeClass(HIDDEN);
      removeHiddenClass(SELECTOR.LABEL_CREATOR);
    });
  }
}
