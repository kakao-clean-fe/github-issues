import { toFetch } from "../utils/helper";
import Observer from "./Observer";

export default class Store extends Observer {
  constructor(path) {
    super();
    this._items = [];
    this._status = "idle";
    this._initialize(path);
  }

  async _initialize(path) {
    this._status = "loading";
    try {
      const items = await toFetch(path);
      items.forEach((item) => this.add(item));
    } catch {
      this._status = "error";
      this.items = [];
    }
    this.notify(this);
    this._status = "success";
  }

  get isError() {
    return this._status === "error";
  }

  get isIdle() {
    return this._status === "idle";
  }

  get isLoading() {
    return this._status === "loading";
  }

  get isSuccess() {
    return this._status === "success";
  }

  add(item) {
    if (this.hasItem(item)) {
      return this;
    }
    this._items.push(item);
    if (this.isSuccess) {
      this.notify(this);
    }
    return this;
  }

  get items() {
    return this._items;
  }

  hasItem(item) {
    return this._items.includes(item);
  }

  remove(targetItem) {
    if (this.hasItem(item)) {
      this._items = this.filter((item) => targetItem !== item);
      if (this.isSuccess) {
        this.notify(this);
      }
    }
    return this;
  }

  map(callbackfn) {
    return this._items.map(callbackfn);
  }

  filter(predicate) {
    return this._items.filter(predicate);
  }

  forEach(callbackfn) {
    this._items.forEach(callbackfn);
    return this;
  }
  every(predicate) {
    return this._items.every(predicate);
  }
  some(predicate) {
    return this._items.some(predicate);
  }
}
