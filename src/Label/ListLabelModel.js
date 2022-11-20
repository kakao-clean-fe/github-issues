import { getLabelsData, getLabelsDataDelay } from "../api";
import { Observable } from "../lib/observable";

export default class ListLabelModel extends Observable {
  constructor() {
    super();
    this.abortController = new AbortController();
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

  async getDelayInitialData() {
    const labels = await getLabelsDataDelay(this.abortController.signal, this.abortController);
    if (labels.length === 0) return;
    this.setLabels(labels);
  }
}