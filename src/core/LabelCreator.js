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
    this._label = new Store({
      id: "labelCreatorData",
      isPersist: true,
      defaultValue: {
        name: "",
        prev: null,
        color: this._createColor(),
        description: "",
      },
    });
    this._error = new Store({ id: "labelCreatorError", defaultValue: "" });

    this.addEvent();
    this.subscribe();

    this._label.notify(this._label);
  }

  saveData(data) {
    this._label.value = { ...this._label.value, ...data };
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
      const $ = this._getElement();
      const el = $(id);

      if (!el) {
        return;
      }

      action(el, store);
    };
  }

  async _addLabel() {
    const data = await toFetch("/labels", {
      body: JSON.stringify({
        ...this._label.value,
        color: this._label.value.color.replace("#", ""),
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    this._labelStore.value = data;
    this.clear();
  }

  async _apiErrorHandle(e) {
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

  toggle() {
    const $ = this._getElement();
    const target = $();

    if (target) {
      target.classList.toggle(HIDDEN);
    }
  }

  clear() {
    this.saveData({
      name: "",
      prev: null,
      color: this._createColor(),
      description: "",
    });
    this._error.value = "";
  }

  subscribe() {
    this._label.subscribe((store) => {
      const $ = this._getElement();
      const labelPreview = $("label-preview");
      const newLabelColor = $("new-label-color");
      const labelNameInput = $("label-name-input");
      const labelColorValue = $("label-color-value");
      const labelCreateButton = $("label-create-button");
      const labelDescriptionInput = $("label-description-input");

      labelPreview.style = `background-color:${store.value.color}`;
      newLabelColor.style = `background-color:${store.value.color}`;
      labelColorValue.value = store.value.color;

      labelPreview.innerText = store.value.name || "Label preview";
      labelNameInput.value = store.value.name;

      labelDescriptionInput.value = store.value.description;

      labelCreateButton.classList.toggle("opacity-50", !store.value.name);
      labelCreateButton.innerText = store.value.prev
        ? " Save label "
        : " Create label ";

      if (store.value.name) {
        labelCreateButton.removeAttribute("disabled");
      } else {
        labelCreateButton.setAttribute("disabled", "true");
      }
    });
    this._error.subscribe((store) => {
      const $ = this._getElement();
      const labelNameError = $("label--name-error");
      const labelCreateButton = $("label-create-button");

      labelNameError.innerText = store.value;
      labelCreateButton.classList.toggle(
        "opacity-50",
        store.value || !this._label.value.name
      );

      if (store.value || !this._label.value.name) {
        labelNameError.removeAttribute("hidden");
        labelCreateButton.setAttribute("disabled", "true");
      } else {
        labelNameError.setAttribute("hidden", "true");
        labelCreateButton.removeAttribute("disabled");
      }
    });
  }

  addEvent() {
    const $ = this._getElement();

    const name = $(NAME);
    const color = $(COLOR);
    const description = $(DESCRIPTION);

    const newColorBtn = $(COLOR_BUTTON);
    const cancelBtn = $(CANCEL_BUTTON);
    const createBtn = $(CREATE_BUTTON);

    name.addEventListener(KEYUP, (e) => {
      this.saveData({ name: e.target.value });
      const duplicate = this._labelStore.value.some(
        (item) => item.name === this._label.value.name
      );
      this._error.value = duplicate ? "이미 등록된 이름입니다." : "";
    });

    color.addEventListener(KEYUP, (e) =>
      this.saveData({ color: e.target.value })
    );

    description.addEventListener(KEYUP, (e) =>
      this.saveData({ description: e.target.value })
    );

    newColorBtn.addEventListener(CLICK, () =>
      this.saveData({ color: this._createColor() })
    );

    cancelBtn.addEventListener(CLICK, () => this.clear());

    createBtn.addEventListener(CLICK, (e) => {
      e.preventDefault();
      if (!this._label.value.prev) {
        // TODO : 수정 처리
        alert("수정!");
        this.clear();
      }
      this._addLabel().catch((e) => this._apiErrorHandle(e));
    });
  }
}
