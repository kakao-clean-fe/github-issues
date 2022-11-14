import Observer from ".";

export class FormStateModel extends Observer {
  constructor() {
    super();
    this.isOpen = false;
  }
  get isOpen() {
    return this._isOpen;
  }
  set isOpen(isOpen) {
    this._isOpen = isOpen; //상태 변경
    this.notify(); //등록된 렌더링 함수들 호출
  }
}
export class LabelListModel extends Observer {
  constructor(labelList) {
    super();
    this.labelList = labelList;
  }
  get labelList() {
    return this._labelList;
  }
  set labelList(labelList) {
    this._labelList = labelList;
    this.notify(); //등록된 렌더링 함수들 호출
  }
  addLabelList(label) {
    this.labelList = [...this.labelList, label];
    this.notify(); //등록된 렌더링 함수들 호출
  }
}