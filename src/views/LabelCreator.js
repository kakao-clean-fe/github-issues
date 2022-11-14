import { getLabelCreatorTpl } from "../tpl"
import { selectElement } from '../utils/dom';
import { SELECTOR } from '../constants/selector';

export const LabelCreator = class {
  get template () {
    return getLabelCreatorTpl();
  }

  constructor () {
    this.element = selectElement(SELECTOR.LABEL_CREATOR_WRAPPER);

    this.initData();
    this.initTemplate();
  }

  initData () {

  }

  initTemplate() {
    if (!this.element) { return; }

    this.element.innerHTML = this.template;

    // TODO: 이벤트 등록 필요한 요소 찾아서 이벤트 등록
  }

  createLabel () {

  }

  onChangeLabelName () {

  }

  onChangeLabelDesc () {

  }

  onChangeLabelColor () {

  }
}

