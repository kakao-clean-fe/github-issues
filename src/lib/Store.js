import { toFetch } from "../utils/helper";
import Observer from "./Observer";

export default class Store extends Observer {
  constructor(defaultItems = []) {
    super();
    this._items = defaultItems;
    this.notify(this);
  }

  get items() {
    return this._items;
  }

  add(item) {
    if (this.hasItem(item)) {
      return;
    }
    this._items.push(item);
    this.notify(this);
  }

  hasItem(item) {
    return this._items.includes(item);
  }

  remove(targetItem) {
    if (!this.hasItem(item)) {
      return;
    }
    this._items = this.filter((item) => targetItem !== item);
    this.notify(this);
  }

  map(callbackfn) {
    return this._items.map(callbackfn);
  }

  filter(predicate) {
    return this._items.filter(predicate);
  }

  forEach(callbackfn) {
    this._items.forEach(callbackfn);
  }

  every(predicate) {
    return this._items.every(predicate);
  }

  some(predicate) {
    return this._items.some(predicate);
  }
}
