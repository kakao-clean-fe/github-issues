/**
 * # Global State를 관리하는 class입니다.
 * 하단에서 AppState instance를 생성하여 사용합니다.
 * */
class State {
  constructor(defaultState={}) {
    this._observers = new Set();
    this.state = defaultState
  }

  update(data = {}, notify = true) {
    this.state = Object.assign(this.state, data)
    if (notify) {
      this.notify()
    }
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

  get() {
    return this.state
  }
}

export const AppState = new State()

export default State
