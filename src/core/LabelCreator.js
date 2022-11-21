import Item from "../lib/Item";

import { createColor } from "../utils/helper";

import { LABEL_CREATOR_EVENT } from "../events";

import { EVENT_KEY, HIDDEN, CLASS_NAME } from "../constants";

const { NAME, COLOR, DESCRIPTION, COLOR_BUTTON, CANCEL_BUTTON, CREATE_BUTTON } =
  CLASS_NAME["label"];

const { KEYUP, CLICK } = EVENT_KEY;

export default class LabelCreator {
  constructor(id, labelStore) {
    this._id = id;
    this._name = new Item("");
    this._color = new Item("");
    this._description = new Item("");
    this._error = new Item("");
    this._labelStore = labelStore;

    this.addEvent();
    this.subscribe();

    this._color.value = this._createColor();
  }

  _createColor() {
    const newColor = createColor();
    if (!this._labelStore.isSuccess()) {
      return newColor;
    }

    if (this._labelStore.every((item) => item.color !== newColor)) {
      return newColor;
    }

    return this._createColor();
  }

  _getElement(target = document) {
    return (id = this._id) => {
      if (target === document) {
        return target.getElementById(id);
      }
      return target.querySelector(`#${id}`);
    };
  }

  _action(id, action) {
    return (store) => {
      const find = this._getElement();
      const el = find(id);

      if (!el) {
        return;
      }

      action(el, store);
    };
  }

  toggle() {
    const find = this._getElement();
    const target = find();

    if (target) {
      target.classList.toggle(HIDDEN);
    }
  }

  clear() {
    this._error.value = "";
    this._name.value = "";
    this._color.value = this._createColor();
    this._description.value = "";
  }

  subscribe() {
    Object.keys(LABEL_CREATOR_EVENT).forEach((key) =>
      LABEL_CREATOR_EVENT[key]
        .map(([id, callback]) => this._action(id, callback))
        .forEach((callback) => {
          this[key].subscribe(callback);
        })
    );
  }

  addEvent() {
    const find = this._getElement();

    const name = find(NAME);
    const color = find(COLOR);
    const description = find(DESCRIPTION);

    const newColorBtn = find(COLOR_BUTTON);
    const cancelBtn = find(CANCEL_BUTTON);
    const createBtn = find(CREATE_BUTTON);

    name.addEventListener(KEYUP, (e) => {
      this._name.value = e.target.value;
      const duplicate = this._labelStore.some(
        (item) => item.name === this._name.value
      );
      this._error.value = duplicate ? "이미 등록된 이름입니다." : "";
    });
    color.addEventListener(KEYUP, (e) => {
      this._color.value = e.target.value;
    });
    description.addEventListener(KEYUP, (e) => {
      this._description.value = e.target.value;
    });

    newColorBtn.addEventListener(CLICK, () => {
      this._color.value = this._createColor();
    });
    cancelBtn.addEventListener(CLICK, () => this.clear());
    createBtn.addEventListener(CLICK, () => {
      if (this._name.value) {
        this._labelStore.add({
          name: this._name.value,
          color: this._color.value.replace("#", ""),
          description: this._description.value,
        });
        this.clear();
      }
    });
  }
}
