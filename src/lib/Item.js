import Observer from "./Observer";

export default class Item extends Observer {
  constructor(defaultValue) {
    super();
    this._value = defaultValue;
  }

  get value() {
    return this._value;
  }

  set value(data) {
    this._value = data;
    this.notify(this);
  }
}
