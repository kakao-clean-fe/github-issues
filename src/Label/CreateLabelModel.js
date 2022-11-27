import { getLabelsData } from "../api";
import { LOCAL_STORE_COLOR } from "../constants";
import { Observable } from "../lib/observable";

export default class CreateLabelModel extends Observable {
  constructor() {
    super();
    this.isOpen = false;
    this.hexColor = '';
    this.form = { name: "", color: "", description: "" };
    this.getInitialData();
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

  async getInitialData() {
    const color = localStorage.getItem(LOCAL_STORE_COLOR);
    this.setHexColor(color ? color : '');
  }
}
