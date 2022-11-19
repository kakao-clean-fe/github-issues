import { fetchLabels } from "../api/fetch.js";

export class LabelStore {
  _labelList = [];
  _color = "";
  constructor() {
    this._getLabels();
  }
  _getLabels() {
    fetchLabels().then((res) => {
      this.labelList = res;
    });
  }
  createLabel(formValue) {
    this.labelList = this._labelList.concat(formValue);
  }
  generateRandomColor() {
    const randomRGBValue = () => Math.floor(Math.random() * 256 * 256 * 256);
    this.color = randomRGBValue().toString(16);
  }
}
