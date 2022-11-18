/**
 * labelStore를 proxy로 만들었다가 라벨리스트를 한번에 할당하기가 어려워
 * Observable 형태를 구현함
 */
export function Observable(initialValue){
  this.observerList = [];
  this.value = initialValue;
}

Observable.prototype.setValue = function(newValue) {
  this.value = newValue;
  this.notify(newValue);
}

Observable.prototype.notify = function(newValue) {
  this.observerList.forEach(observer => observer(newValue));
}

Observable.prototype.subscribe = function(observers = []) {
  observers.forEach(observer => this.observerList.push(observer));
}

Observable.prototype.unsubscribe = function(observers = []) {
  this.observerList = this.observerList.filter(_observer => !observers.includes(_observer));
}