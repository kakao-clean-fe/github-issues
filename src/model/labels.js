import Observable from "./observable";

class Labels extends Observable {
  constructor() {
    super();
    this.labels = [];
  }

  set allLabels(newLabels) {
    this.labels = newLabels;
  }
  get allLabels() {
    return this.labels;
  }

  add(label) {
    this.labels.push(label);
    this.notify(this.labels);
  }

  remove(label) {
    this.labels = this.labels.filter((l) => l !== label);
    this.notify(this.labels);
  }
}

export default Labels;
