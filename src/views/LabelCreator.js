import { getLabelCreatorTpl } from "../tpl"
import { selectElement } from '../utils/dom';
import { SELECTOR } from '../constants/selector';
import { addLabelData } from "../store/dataStore";

export const LabelCreator = class {

  name = null;
  description = null;
  color = null;

  get template () {
    return getLabelCreatorTpl();
  }

  get event () {
    return {
      [SELECTOR.LABEL_NAME_INPUT]: 'onInputLabelName',
      [SELECTOR.LABEL_DESC_INPUT]: 'onInputLabelDesc',
      [SELECTOR.LABEL_COLOR_BUTTON]: 'onClickColorButton',
      [SELECTOR.LABEL_COLOR_INPUT]: 'onInputLabelColor',
      [SELECTOR.CREATE_LABEL_BUTTON]: 'onClickCreateLabelButton',
      [SELECTOR.CANCEL_LABEL_BUTTON]: 'onClickCancelButton',
    };
  }

  constructor () {
    this.parentElement = selectElement(SELECTOR.LABEL_CREATOR_WRAPPER);

    this.initData();
    this.initTemplate();
  }

  initData () {

  }

  initTemplate() {
    if (!this.parentElement) { return; }

    this.parentElement.innerHTML = this.template;

    // TODO: 이벤트 등록 필요한 요소 찾아서 이벤트 등록
  }

  createLabel ({name, description, color}) {
    addLabelData({name, description, color});
  }

  onInputLabelName ({target}) {
    this.name = target.value;
  }

  onInputLabelDesc ({target}) {
    this.description = target.value;
  }

  onClickColorButton ({target}) {

  }

  onInputLabelColor () {

  }

  onClickCreateLabelButton () {
    this.createLabel({
      name: this.name,
      description: this.description,
      color: this.color
    });

    // labelCreator 닫기
    this.toggleLabelCreator();
  }

  onClickCancelButton () {
    // labelCreator 닫기
    this.toggleLabelCreator();
  }

  toggleLabelCreator () {
    toggleClass(SELECTOR.LABEL_CREATOR, HIDDEN);
  }
}

