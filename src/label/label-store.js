import { createLabel, getLabels, getLabelsWithDelay } from "../api/fetch.js";

export class LabelStore {
  _labelList = [];
  _form = {
    color: "",
    name: "",
    description: "",
  };
  constructor() {
    this.getLabels();
  }
  getLabels() {
    getLabelsWithDelay().then((res) => {
      if (res) {
        this.labelList = res;
      }
    });
  }
  createLabel() {
    createLabel(this._form).then((res) => {
      if (res.error) {
        console.error(res.error);
        alert(res.error);
        return;
      }
      this.labelList = res;
    });
  }
  generateRandomColor() {
    const randomRGBValue = () => Math.floor(Math.random() * 256 * 256 * 256);
    this.form = { ...this._form, color: randomRGBValue().toString(16) };
  }
  setLabelForm(changes) {
    const newForm = this._form;
    if (changes.name) newForm.name = changes.name;
    if (changes.description) newForm.description = changes.description;
    this.form = newForm;
  }
}
