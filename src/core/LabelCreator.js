import Store from "../lib/Store";

import { toFetch, createColor } from "../utils/helper";

import { EVENT_KEY, HIDDEN, CLASS_NAME } from "../constants";

const { NAME, COLOR, DESCRIPTION, COLOR_BUTTON, CANCEL_BUTTON, CREATE_BUTTON } =
  CLASS_NAME["label"];

const { KEYUP, CLICK } = EVENT_KEY;

export default class LabelCreator {
  constructor(id, labelStore) {
    this._labelStore = labelStore;
    this._id = id;
    this._data = new Store({
      name: "",
      color: "",
      description: "",
    });
    this._error = new Store("");

    this.addEvent();
    this.subscribe();
    this._saveData({ color: this._createColor() });
  }

  _saveData(data) {
    this._data.value = { ...this._data.value, ...data };
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
    this._saveData({
      name: "",
      color: this._createColor(),
      description: "",
    });
    this._error.value = "";
  }

  subscribe() {
    this._data.subscribe((store) => {
      const find = this._getElement();
      const labelPreview = find("label-preview");
      const newLabelColor = find("new-label-color");
      const labelNameInput = find("label-name-input");
      const labelColorValue = find("label-color-value");
      const labelCreateButton = find("label-create-button");
      const labelDescriptionInput = find("label-description-input");

      labelPreview.style = `background-color:${store.value.color}`;
      newLabelColor.style = `background-color:${store.value.color}`;
      labelColorValue.value = store.value.color;

      labelPreview.innerText = store.value.name || "Label preview";
      labelNameInput.value = store.value.name;

      labelDescriptionInput.value = store.value.description;

      labelCreateButton.classList.toggle("opacity-50", !store.value.name);

      if (store.value.name) {
        labelCreateButton.removeAttribute("disabled");
      } else {
        labelCreateButton.setAttribute("disabled", "true");
      }
    });
    this._error.subscribe((store) => {
      const find = this._getElement();
      const labelNameError = find("label--name-error");
      const labelCreateButton = find("label-create-button");

      labelNameError.innerText = store.value;
      labelCreateButton.classList.toggle(
        "opacity-50",
        store.value || !this._data.value.name
      );

      if (store.value || !this._data.value.name) {
        labelNameError.removeAttribute("hidden");
        labelCreateButton.setAttribute("disabled", "true");
      } else {
        labelNameError.setAttribute("hidden", "true");
        labelCreateButton.removeAttribute("disabled");
      }
    });
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
      this._saveData({ name: e.target.value });
      const duplicate = this._labelStore.value.some(
        (item) => item.name === this._data.value.name
      );
      this._error.value = duplicate ? "이미 등록된 이름입니다." : "";
    });

    color.addEventListener(KEYUP, (e) => {
      this._saveData({ color: e.target.value });
    });

    description.addEventListener(KEYUP, (e) => {
      this._saveData({ description: e.target.value });
    });

    newColorBtn.addEventListener(CLICK, () => {
      this._saveData({ color: this._createColor() });
    });

    cancelBtn.addEventListener(CLICK, () => this.clear());

    createBtn.addEventListener(CLICK, async (e) => {
      e.preventDefault();
      try {
        const data = await toFetch("/labels", {
          body: JSON.stringify({
            ...this._data.value,
            color: this._data.value.color.replace("#", ""),
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
