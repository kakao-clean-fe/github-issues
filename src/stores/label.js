import Observer from ".";
import { getStorageItem, setStorageItem } from "../utils/storage";

export class LabelStore extends Observer {
  constructor(labelList, storage = localStorage) {
    super();
    this._isOpen = false;
    this._labelList = labelList;
    this._label = JSON.parse(getStorageItem('NEW_LABEL', {}, storage));
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
    setStorageItem('NEW_LABEL', label, storage);
    this.notify(); //등록된 렌더링 함수들 호출
  }
}
