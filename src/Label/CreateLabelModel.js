import { getLabelsData } from "../api";
import { Observable } from "../lib/observable";

export default class CreateLabelModel extends Observable {
  constructor() {
    super();
    this.isOpen = false;
    this.hexColor = '';
    this.form = { name: "", color: "", description: "" };
  }

  setHexColor(value) {
    this.hexColor = value;
    this.notify(this.hexColor);
  }

  getHexColor() {
    return this.hexColor;
  }

  getIsOpen() {
    return this.isOpen;
  }

  setIsOpen(value) {
    this.isOpen = value;
    this.notify(this.isOpen);
  }

  async pushFormData() {}

  async getInitialData() {
    // const labels = await getLabelsData();
    // this.setLabels(labels);
  }
}
