import Store from "../lib/Store";

import { toFetch, createColor } from "../utils/helper";

import { LABEL_CREATOR_EVENT } from "../events";

import { EVENT_KEY, HIDDEN, CLASS_NAME } from "../constants";

const { NAME, COLOR, DESCRIPTION, COLOR_BUTTON, CANCEL_BUTTON, CREATE_BUTTON } =
  CLASS_NAME["label"];

const { KEYUP, CLICK } = EVENT_KEY;

export default class LabelCreator {
  constructor(id, labelStore) {
    this._id = id;
    this._name = new Store("");
    this._color = new Store("");
    this._description = new Store("");
    this._error = new Store("");
    this._labelStore = labelStore;

    this.addEvent();
    this.subscribe();

    this._color.value = this._createColor();
  }

  _createColor() {
    const newColor = createColor();
    return this._labelStore.value.every((item) => item.color !== newColor)
      ? newColor
      : this._createColor();
  }

  _getElement(target = document) {
    return (id = this._id) =>
      target === document
        ? target.getElementById(id)
        : target.querySelector(`#${id}`);
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
      const duplicate = this._labelStore.value.some(
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

    createBtn.addEventListener(CLICK, async (e) => {
      e.preventDefault();
      try {
        const data = await toFetch("/labels", {
          body: JSON.stringify({
            name: this._name.value,
            color: this._color.value.replace("#", ""),
            description: this._description.value,
          }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        this._labelStore.value = data;
        this.clear();
      } catch (e) {
        const msg = await e.json();
        if (e.status === 500) {
          this.clear();
          this._error.value = msg.error;
          return;
        }
        if (e.status === 400) {
          this._error.value = msg.error;
          return;
        }
        throw e;
      }
    });
  }
}
