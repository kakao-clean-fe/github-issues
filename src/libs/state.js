import Observable from "./observable.js";

/**
 * # Global State를 관리하는 class입니다.
 * 하단에서 AppState instance를 생성하여 사용합니다.
 * */
class State extends Observable {
  constructor() {
    super()
    this.state = {}
  }

  update(data = {}, notify=true) {
    this.state = Object.assign(this.state, data)
    if (notify) {
      this.notify()
    }
  }

  notify() {
    super.notify(this.state)
  }

  get() {
    return this.state
  }
}

const AppState = new State()

export default AppState
