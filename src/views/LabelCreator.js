import { getLabelCreatorTpl } from "../tpl"
import { addEventListener, selectElement, toggleClass } from '../utils/dom';
import { SELECTOR } from '../constants/selector';
import { EVENT } from '../constants/event';
import { HIDDEN } from '../constants/status';
import { LABEL_COLOR } from "../constants/labelColor";
import { generateColor } from '../utils/label';
import { addLabelData } from '../common/api';
import { localStorageUtil } from '../utils/localStorage';
import { LOCAL_STORAGE_KEY } from "../constants/localStorage";

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
    return getLabelCreatorTpl(this.name, this.description, this.color);
  }


  initData () {
    this.name = localStorageUtil.getItem(LOCAL_STORAGE_KEY.NAME) || '';
    this.description = localStorageUtil.getItem(LOCAL_STORAGE_KEY.DESCRIPTION) || '';
    this.color = localStorageUtil.getItem(LOCAL_STORAGE_KEY.COLOR) || '';
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

  onInputLabelName ({target: {value}}) {
    this.name = value;
    localStorageUtil.setItem(LOCAL_STORAGE_KEY.NAME, value);
  }

  onInputLabelDesc ({target: {value}}) {
    this.description = value;
    localStorageUtil.setItem(LOCAL_STORAGE_KEY.DESCRIPTION, value);
  }

  onClickColorButton () {
    const {colorIndex, color} = generateColor(LABEL_COLOR, this.colorIndex);
    const labelColorInput = selectElement(SELECTOR.LABEL_COLOR_INPUT);

    labelColorInput.value = color;
    this.colorIndex = colorIndex;
    this.color = color;

    localStorageUtil.setItem(LOCAL_STORAGE_KEY.COLOR, color);
  }

  onInputLabelColor () {

  }

  onClickCreateLabelButton (e) {
    e.preventDefault();

    const canCreateLabel = this.name && this.description && this.color;
    if (!canCreateLabel) { return; }
    if (this.color.startsWith('#')) {
      this.color = this.color.slice(1);
    }

    this.createLabel({
      name: this.name,
      description: this.description,
      color: this.color
    });

    this.toggleLabelCreator();
    localStorageUtil.reset();
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

