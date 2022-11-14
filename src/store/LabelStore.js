import { fetchData } from '/src/util/common';
import Observable from '/src/util/observable';

export default class LabelStore extends Observable {
  constructor(data) {
    super();
    this._data = data;
  }
  get labels() {
    return this._data;
  }
  addLabel(data) {
    this._data.push(data);
    this.notify();
  }
}