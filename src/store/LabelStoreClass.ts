import { IStore } from './Store';


class LabelStore<T = any> implements IStore<T> {
  #initData: T;

  constructor(initData: T) {
    this.#initData = initData;
  }
  getData() {
    return this.#initData;
  }
  setData(initData: T) {
    this.#initData = initData;
  }
}

const labelStore = new LabelStore()
