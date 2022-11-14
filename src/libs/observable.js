class Observable {
  constructor() {
    this._observers = new Set();
  }

  subscribe(observer) {
    this._observers.add(observer);
  }

  unsubscribe(observer) {
    this._observers.delete(observer)
  }

  notify(state) {
    this._observers.forEach(observer => observer.update(state));
  }
}

export default Observable
