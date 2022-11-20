import { createLabel, getLabels, getLabelsWithDelay } from "../api/fetch.js";

export class LabelStore {
  _labelList = [];
  _color = "";
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
