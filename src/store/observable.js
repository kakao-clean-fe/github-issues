
export function ObserverArray() {
  this.observers = [];
}

ObserverArray.prototype.add = function(_observers = []) {
  _observers.forEach(observer => this.observers.push(observer));
}

ObserverArray.prototype.run = function(value) {
  this.observers.forEach(observer => observer(value));
}

ObserverArray.prototype.remove = function(observers = []) {
  this.observers = this.observers.filter(_observer => !observers.includes(_observer));
}

/**
 * labelStore를 proxy로 만들었다가 라벨리스트를 한번에 할당하기가 어려워
 * Observable 형태를 구현함
 */
export function Observable(initialValue){
  this.observerList = new ObserverArray();
  this.value = initialValue;
}

Observable.prototype.setValue = function(newValue = []) {
  this.value = newValue;
  this.notify(newValue);
}

Observable.prototype.notify = function(newValue) {
  this.observerList.run(newValue);
}

Observable.prototype.subscribe = function(observers = []) {
  this.observerList.add(observers);
}

Observable.prototype.unsubscribe = function(observers = []) {
  this.observerList.remove(observers);
}