import { toggleClass, toggleAttr } from '/src/util/common';

const $ = {
  LABEL_CREATE_BTN: '#label-create-button'
};

export default class LabelFormStore {
  constructor() {
    this.$button = document.querySelector($.LABEL_CREATE_BTN);
  }
  set name(data) {
    this._name = data;
    this.validate();
  }
  set description(data) {
    this._description = data;
    this.validate();
  }
  set color(data) {
    this._color = data;
    this.validate();
  }
  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  get color() {
    return this._color;
  }
  validate() {
    if (this.isValid())
    {
      toggleClass($.LABEL_CREATE_BTN, 'opacity-50', false);
      toggleAttr($.LABEL_CREATE_BTN, 'disabled', false);
    } else {
      toggleClass($.LABEL_CREATE_BTN, 'opacity-50', true);
      toggleAttr($.LABEL_CREATE_BTN, 'disabled', true);
    }
  }
  isValid() {
    return (
      this._name &&
      this._description &&
      this._color &&
      this._name.length > 0 &&
      this._description.length > 0 &&
      this._color.length > 0
    )
  }
}