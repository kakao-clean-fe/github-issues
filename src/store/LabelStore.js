import { postData, fetchData, fetchDataWithAbort } from '/src/util/common';
import Observable from '/src/util/observable';

export default class LabelStore extends Observable {
  constructor() {
    super();
    this._data = null;
    this.controller = { ref: null };
  }
  get labels() {
    return this._data;
  }
  async fetch() {
    const data = await fetchData('labels');
    this._data = data;
    this.notify();
  }
  async update() {
    const res = await fetchDataWithAbort('labels-delay', this.controller);
    console.log(res);
  }
  async add(data) {
    const res = await postData('/labels', data);
    if (res.status !== 201) {
      console.error(res);
      alert(`에러가 발생했습니다 :: ${res.statusText}`);
      return;
    }

    this._data.push(data);
    this.notify();
  }
}