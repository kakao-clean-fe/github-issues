import {
  CLASS_LABEL_LIST,
  CLASS_OPEN_BTN,
  ID_LABEL_PREVIEW,
  ID_NEW_LABEL_COLOR,
  ID_NEW_LABEL_COLOR_INPUT,
  ID_NEW_LABEL_FORM,
  KEY_HIDDEN,
} from "../constants";

export default class CreateLabelView {
  constructor({ model }) {
    this.$target = null;
    this.CreateLabelModel = model;
    this.CreateLabelModel.subscribe(this.render.bind(this));
  }

  render() {
    this.$target = document.querySelector(ID_NEW_LABEL_FORM);
    if (this.CreateLabelModel.isOpen) {
      this.$target.classList.remove(KEY_HIDDEN);
    } else {
      this.$target.classList.add(KEY_HIDDEN);
    }

    const labelPreview = this.$target.querySelector(ID_LABEL_PREVIEW);
    const labelColor = this.$target.querySelector(ID_NEW_LABEL_COLOR);
    const labelColorInput = this.$target.querySelector(ID_NEW_LABEL_COLOR_INPUT);

    labelPreview.style.backgroundColor = `#${this.CreateLabelModel.hexColor}`;
    labelColor.style.backgroundColor = `#${this.CreateLabelModel.hexColor}`;
    labelColorInput.value = `#${this.CreateLabelModel.hexColor}`;
  }
}
