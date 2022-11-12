export const getRandomHexColor = () => {
  return Math.floor(Math.random()*16777215).toString(16);
}

export class Observable {
  constructor() {
      this._observers = [];
  }
  subscribe(observer) {
      this._observers.push(observer);
  }
  unsubscribe(observer) {
      this._observers = [...this._observers].filter(subscriber => subscriber !== observer);
  }
  notify(data) {
      this._observers.forEach(observer => observer(data));
  }
}