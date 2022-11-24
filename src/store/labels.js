import Observable from "../store/observable";

class Labels extends Observable {
  constructor(labels) {
    super();
    this.labels = labels || [];
  }

  get() {
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

  removeAll() {
    this.labels = [];
    this.notify(this.labels);
  }
}

export default Labels;
