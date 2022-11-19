import { createLabel, getLabels } from "../api/fetch.js";

export class LabelStore {
  _labelList = [];
  _color = "";
  constructor() {
    this._getLabels();
  }
  _getLabels() {
    getLabels().then((res) => {
      this.labelList = res;
    });
  }
  createLabel(formValue) {
    createLabel(formValue).then((res) => {
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
    this.color = randomRGBValue().toString(16);
  }
}
