export default class Observable {
  constructor() {
    this.state = {};
    this._observers = new Set();
  }

  subscribe(observer) {
    this._observers.add(observer);
  }

  setState(newState) {
    this.state = newState;
    this.notify();
  }

  unsubscribe(observer) {
    this._observers = [...this._observers].filter(subscriber => subscriber !== observer);
  }

  notify() {
    this._observers.forEach(observer => observer(this.state));
  }
}