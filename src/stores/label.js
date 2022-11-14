import Observer from ".";

export default class FormStateModel extends Observer {
  constructor() {
    super();
    this.isOpen = false;
  }
  getIsOpen() {
    return this.isOpen;
  }
  setIsOpen(isOpen) {
    console.log('111', isOpen)
    this.isOpen = isOpen; //상태 변경
    this.notify(); //등록된 렌더링 함수들 호출
  }
}