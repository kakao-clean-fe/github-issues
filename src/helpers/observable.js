export class Observable {
  constructor() {
    this.value = undefined;
    this.callbacks = [];
  }
  next(nextValue) {
    this.callbacks.forEach((fn) => fn(nextValue));
    this.value = nextValue;
  }
  subscribe(callbackFn) {
    this.callbacks.push(callbackFn);
  }
  getValue() {
    return this.value;
  }
}
