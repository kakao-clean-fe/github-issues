import { getLabelsData } from "../api";
import { Observable } from "../utils";

export default class ListLabelModel extends Observable {
  constructor() {
    super();
    this.labels = [];
  }

  addLabel(label) {
    this.labels = [...this.labels, label];
    this.notify(this.labels);
  }

  setLabels(labels) {
    this.labels = labels;
    this.notify(this.labels);
  }

  getLabels() {
    return this.labels;
  }

  async getInitialData() {
    const labels = await getLabelsData();
    this.setLabels(labels);
  }
}