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

export class Label extends Observer {
  constructor({name, description, color}) {
    super();
    this.name = name;
    this.description = description;
    this.color = color;
  }
  get label() {
    return this._label;
  }
  set label({name, description, color}) {
    // this._label = label;
    this.notify(); //등록된 렌더링 함수들 호출
  }
}
