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

    // TODO: 이벤트 등록 필요한 요소 찾아서 이벤트 등록
    this.initEvent();
  }

  initEvent () {
    const addClickEventListener = addEventListener(EVENT.CLICK);
    const addInputEventListener = addEventListener(EVENT.INPUT);

    addInputEventListener(SELECTOR.LABEL_NAME_INPUT, this.onInputLabelName.bind(this));
    addInputEventListener(SELECTOR.LABEL_NAME_INPUT, this.onInputLabelDesc.bind(this));
    // addInputEventListener(SELECTOR.LABEL_NAME_INPUT, this.onInputLabelColor);

    addClickEventListener(SELECTOR.LABEL_COLOR_BUTTON, this.onClickColorButton.bind(this));
    addClickEventListener(SELECTOR.CREATE_LABEL_BUTTON, this.onClickCreateLabelButton.bind(this));
    addClickEventListener(SELECTOR.CANCEL_LABEL_BUTTON, this.onClickCancelButton.bind(this));
  }

  createLabel ({name, description, color}) {
    addLabelData({name, description, color});
  }

  onInputLabelName ({target}) {
    console.log(target.value);
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

