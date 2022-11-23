import Observer from ".";

export class LabelStore extends Observer {
  constructor(labelList) {
    super();
    this._isOpen = false;
    this._labelList = labelList;
    this._label = JSON.parse(localStorage.getItem('NEW_LABEL', {}));
  }
  get isOpen() {
    return this._isOpen;
  }
  set isOpen(isOpen) {
    this._isOpen = isOpen; //상태 변경
    this.notify(); //등록된 렌더링 함수들 호출
  }

  get labelList() {
    return this._labelList;
  }
  set labelList(labelList) {
    this._labelList = labelList;
    this.notify(); //등록된 렌더링 함수들 호출
  }

  get label() {
    return this._label;
  }
  set label(label) {
    this._label = label;
    localStorage.setItem('NEW_LABEL', JSON.stringify(label));
    this.notify(); //등록된 렌더링 함수들 호출
  }
}
