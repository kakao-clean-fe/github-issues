import { getLabelCreator } from "../tpl"
import { selectElement } from '../utils/dom';

export const LabelCreator = class {

  get events () {

  }

  // 데이터 초기화 -> 템플릿 생성 -> 이벤트 등록
  get template () {
    return getLabelCreator();
  }

  constructor () {
    this.element = selectElement('._label_creator_wrapper');

    this.initData();
    this.initTemplate();
  }

  initData () {

  }

  initTemplate() {
    if (!this.element) { return; }

    // 템플릿 생성
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

