import AppState from "./state.js";

/**
 * Observer class
 * - instance 생성과 함께 AppState에 subscribe합니다.
 * */
class Observer {
  constructor() {
    AppState.subscribe(this)
    this.contents = null
  }

  /** rendering시 처음 mount할 element */
  get $targetEl() {
    throw new Error('Abstract property')
  }

  /** mount시 실행할 function */
  mountFunction(node) {
    return this.$targetEl.appendChild(node)
  }

  /** tpl.js 에서 정의된 template을 state와 함께 dom으로 변환 */
  getTemplate(state) {
  }

  /** render 함수 내에서 mount 이후 bind할 이벤트 정의 */
  bindEvents() {
  }

  /**
   * rendering 실행
   * 1. template + state -> DOM 변환
   * 2. mount
   * 3. bind events
   * */
  render() {
    this.clear()
    this.contents = this.getTemplate(AppState.get())
    this.mountFunction(this.contents)
    this.bindEvents()
  }

  /** rendering 전 DOM clear */
  clear() {
    if (this.contents) {
      this.contents.remove()
    }
  }

  /** observer를 통해 실행될 update */
  update() {
    this.render()
  }
}

export default Observer;
