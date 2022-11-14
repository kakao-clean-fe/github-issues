import Item from "./Item";

// ref : https://css-tricks.com/snippets/javascript/random-hex-color/
const createRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export default class LabelCreateUI {
  constructor(id, labelStore) {
    this._id = id;
    this._name = new Item("");
    this._color = new Item("");
    this._description = new Item("");
    this._labelStore = labelStore;

    this._color.subscribe((store) => {
      const target = this._getElement();
      const el = this._getElement("label-preview", target);

      if (!el || !store.value) {
        return;
      }
      el.style = `background-color:${store.value};`;
    });

    this._color.subscribe((store) => {
      const target = this._getElement();
      const el = this._getElement("label-color-value", target);
      if (!el || !store.value) {
        return;
      }

      el.value = store.value;
    });

    this._color.subscribe((store) => {
      const target = this._getElement();
      const el = this._getElement("new-label-color", target);
      if (!el || !store.value) {
        return;
      }
      el.style = `background-color:${store.value};`;
    });

    this._name.subscribe((store) => {
      const target = this._getElement();
      const el = this._getElement("label-preview", target);
      if (!el) {
        return;
      }
      el.innerText = store.value || "Label preview";
    });
    this._name.subscribe((store) => {
      const target = this._getElement();
      const el = this._getElement("label-name-input", target);
      if (!el) {
        return;
      }
      el.value = store.value;
    });
    this._name.subscribe((store) => {
      const target = this._getElement();
      const el = this._getElement("label-create-button", target);
      if (!el) {
        return;
      }
      el.classList.toggle("opacity-50", !store.value);
      if (store.value) {
        el.removeAttribute("disabled");
        return;
      }
      el.setAttribute("disabled", "true");
    });
    this._description.subscribe((store) => {
      const target = this._getElement();
      const el = this._getElement("label-description-input", target);
      if (!el) {
        return;
      }
      el.value = store.value;
    });

    this._color.value = this._createColor();
  }

  _createColor() {
    const newColor = createRandomColor();
    if (!this._labelStore.isSuccess) {
      return newColor;
    }

    if (this._labelStore.every((item) => item.color !== newColor)) {
      return newColor;
    }

    return this._createColor();
  }

  _getElement(id = this._id, target = document) {
    if (target === document) {
      return target.getElementById(id);
    }
    return target.querySelector(`#${id}`);
  }

  toggle() {
    const target = this._getElement();
    if (target) {
      target.classList.toggle("hidden");
    }
    return this;
  }

  clear() {
    this._name.value = "";
    this._color.value = this._createColor();
    this._description.value = "";
  }

  render() {
    const target = this._getElement();
    const labelNameInput = this._getElement("label-name-input", target);
    const labelColorValue = this._getElement("label-color-value", target);
    const labelDescriptionInput = this._getElement(
      "label-description-input",
      target
    );
    const newLabelColor = this._getElement("new-label-color", target);
    const labelCancelButton = this._getElement("label-cancel-button", target);
    const labelCreateButton = this._getElement("label-create-button", target);

    labelNameInput.addEventListener("keyup", (e) => {
      this._name.value = e.target.value;
    });
    labelColorValue.addEventListener("keyup", (e) => {
      this._color.value = e.target.value;
    });
    labelDescriptionInput.addEventListener("keyup", (e) => {
      this._description.value = e.target.value;
    });
    newLabelColor.addEventListener("click", () => {
      this._color.value = this._createColor();
    });

    labelCancelButton.addEventListener("click", () => this.clear());
    labelCreateButton.addEventListener("click", () => {
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
