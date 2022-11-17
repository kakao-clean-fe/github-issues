import { fetchBody } from "../utils";
import Observer from "./observer";

class LabelModel extends Observer {
  constructor() {
    super();
    this._labels = [];
    this.initState();
  }

  get labels() {
    return this._labels;
  }
  
  set labels(newLabels) {
    this._labels = newLabels;
    this.notify(this._labels)
  }

  addLabel(label) {
    this.labels.push(label);
    this.notify(this.labels);
  }

  removeLabel(label) {
    this.labels = this.labels.filter(l => l !== label);
    this.notify(this.labels);
  }

  async initState() {
    const labels = await fetchBody("/data-sources/labels.json");
    this.labels = labels;
  }
}


export default LabelModel;