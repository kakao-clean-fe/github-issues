import Observer from "./Observer";

export default class Store extends Observer {
  constructor({ id, defaultValue, isPersist = false }) {
    super();
    this._id = id;
    this._isPersist = isPersist;

    this._value = this._loadLocalStorage(defaultValue);
    this.notify(this);
  }

  _saveLocalStorage(value) {
    if (!this._isPersist) {
      return;
    }
    localStorage.setItem(
      this._id,
      typeof defaultValue === "string" ? value : JSON.stringify(value)
    );
  }

  _loadLocalStorage(defaultValue) {
    if (!this._isPersist) {
      return defaultValue;
    }
    const data = localStorage.getItem(this._id);
    if (!data) {
      this._saveLocalStorage(defaultValue);
      return defaultValue;
    }
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  }

  set value(nextValue) {
    this._value = nextValue;
    this._saveLocalStorage(nextValue);
    this.notify(this);
  }

  get value() {
    return this._value;
  }
}
