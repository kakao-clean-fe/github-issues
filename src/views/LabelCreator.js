import { getLabelCreatorTpl } from "../tpl"
import { addEventListener, selectAllElement, selectElement, toggleClass } from '../utils/dom';
import { SELECTOR } from '../constants/selector';
import { EVENT } from '../constants/event';
import { HIDDEN } from '../constants/status';
import { LABEL_COLOR } from "../constants/labelColor";
import { generateColor } from '../utils/label';
import { addLabelData } from '../common/api';

export const LabelCreator = class {

  name = '';
  description = '';
  color = '';
  colorIndex = 0;

  constructor () {
    this.parentElement = selectElement(SELECTOR.LABEL_CREATOR_WRAPPER);

    this.initData();
    this.initTemplate();
  }

  get template () {
    return getLabelCreatorTpl();
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

  async createLabel ({name, description, color}) {
    const newLabel = await addLabelData({name, description, color});
    console.log(newLabel);
  }

  onInputLabelName ({target}) {
    this.name = target.value;
  }

  onInputLabelDesc ({target}) {
    this.description = target.value;
  }

  onClickColorButton () {
    const {colorIndex, color} = generateColor(LABEL_COLOR, this.colorIndex);
    /** 색상확인 편의를 위해 미리 #을 붙여서 color에 넣어줄 땐 제거 */
    const refinedColorString = color.slice(1);
    const labelColorInput = selectElement(SELECTOR.LABEL_COLOR_INPUT);

    labelColorInput.value = color;
    this.colorIndex = colorIndex;
    this.color = refinedColorString;
  }

  onInputLabelColor () {

  }

  onClickCreateLabelButton (e) {
    e.preventDefault();

    const canCreateLabel = this.name && this.description && this.color;
    if (!canCreateLabel) { return; }


    this.createLabel({
      name: this.name,
      description: this.description,
      color: this.color
    });

    this.toggleLabelCreator();
  }

  onClickCancelButton () {
    this.resetLabelData();
    this.resetLabelInput();
    this.toggleLabelCreator();
  }

  resetLabelData () {
    this.name = '';
    this.description = '';
    this.color = ''
  }

  resetLabelInput () {
    selectElement(SELECTOR.LABEL_NAME_INPUT).value = '';
    selectElement(SELECTOR.LABEL_DESC_INPUT).value = '';
    selectElement(SELECTOR.LABEL_COLOR_INPUT).value = '';
  }

  toggleLabelCreator () {
    toggleClass(SELECTOR.LABEL_CREATOR, HIDDEN);
  }
}

