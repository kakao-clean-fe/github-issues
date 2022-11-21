import Observer from "./Observer";

export default class Store extends Observer {
  constructor(defaultValue) {
    super();
    this._value = defaultValue;
    this.notify(this);
  }

  set value(nextValue) {
    this._value = nextValue;
    this.notify(this);
  }

  get value() {
    return this._value;
  }
}
