import { getLabelCreatorTpl } from "../tpl"
import { addEventListener, selectAllElement, selectElement, toggleClass } from '../utils/dom';
import { SELECTOR } from '../constants/selector';
import { addLabelData } from "../store/dataStore";
import { EVENT } from '../constants/event';
import { HIDDEN } from '../constants/status';

export const LabelCreator = class {

  name = null;
  description = null;
  color = null;

  get template () {
    return getLabelCreatorTpl();
  }

  constructor () {
    this.parentElement = selectElement(SELECTOR.LABEL_CREATOR_WRAPPER);

    this.initData();
    this.initTemplate();
  }

  initData () {

  }

  initTemplate () {
    if (!this.parentElement) { return; }

    this.parentElement.innerHTML = this.template;

    this.initEvent();
  }

  initEvent () {
    const addClickEventListener = addEventListener(EVENT.CLICK);
    const addInputEventListener = addEventListener(EVENT.INPUT);

    addInputEventListener(SELECTOR.LABEL_NAME_INPUT, this.onInputLabelName.bind(this));
    addInputEventListener(SELECTOR.LABEL_NAME_INPUT, this.onInputLabelDesc.bind(this));

    addClickEventListener(SELECTOR.LABEL_COLOR_BUTTON, this.onClickColorButton.bind(this));
    addClickEventListener(SELECTOR.CREATE_LABEL_BUTTON, this.onClickCreateLabelButton.bind(this));
    addClickEventListener(SELECTOR.CANCEL_LABEL_BUTTON, this.onClickCancelButton.bind(this));
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

  onClickCreateLabelButton (e) {
    e.preventDefault();

    this.createLabel({
      name: this.name,
      description: this.description,
      color: 'bfdadc', // 임시 코드
      // color: this.color
    });

    this.toggleLabelCreator();
  }

  onClickCancelButton () {
    this.resetLabelData();
    this.toggleLabelCreator();
  }

  resetLabelData () {
    // 데이터 초기화
    // 입력란 초기화
  }

  toggleLabelCreator () {
    toggleClass(SELECTOR.LABEL_CREATOR, HIDDEN);
  }
}

