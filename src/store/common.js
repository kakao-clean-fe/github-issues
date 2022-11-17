export class Subject {
  constructor() {
    this._observers = new Set();
  }
  subscribe(observer) {
    this._observers.add(observer);
  }
  unsubscribe(observer) {
    this._observers = [...this._observers].filter(subscriber => subscriber !== observer);
  }
  notify() {
    // Execure whatever registered.
    this._observers.forEach(observer => observer());
  }
}