import { ProxyStore } from './proxy';
import { Observable } from './observable';
import { fetchStoreData } from '../util/feature';

export const colorList = [
  '#DC3535', '#f97516', '#fcd34d', '#22c55e', '#EE6983',
  '#38bef8', '#4649FF', '#fde047', '#eef1ff', '#b1b2ff',
];

/**
 * week2 객체 지향 프로그래밍
 * label 관련
 */
function createLabelStore(initialValue) {
  // Observable의 constructor 로직 실행
  Observable.call(this, initialValue);
  this.addObserverList = [];
}
/**
 * Object.create(object) creates an object with a prototype of the
 * passed in object.
 */
createLabelStore.prototype = Object.create(Observable.prototype);
createLabelStore.constructor = createLabelStore;
createLabelStore.prototype.fetchLabels = function() {
  fetchStoreData('../../data-sources/labels.json')(labelStore$);
}
createLabelStore.prototype.add = function(newLabels=[]) {
  newLabels.forEach(newLabel => {
    this.value.push(newLabel);
    this.notifyAddObservers(newLabel);
  });
}
createLabelStore.prototype.subscribeAdd = function(observers = []) {
  observers.forEach(observer => this.addObserverList.push(observer));
}
createLabelStore.prototype.notifyAddObservers = function(newValue) {
  this.addObserverList.forEach(observer => observer(newValue));
}
/** override */
createLabelStore.prototype.unsubscribe = function(observers = []) {
  this.observerList = this.observerList.filter(_observer => !observers.includes(_observer));
  this.addObserverList = this.addObserverList.filter(_observer => !observers.includes(_observer));
}

export const labelStore$ = new createLabelStore([]);

/**
 * color store
 */
const initialColorValue = {
  colors: new Set(colorList),
  cur: colorList[0],
  next: null,
  temp: null,
};
// to do
export const newLabelColorStore$ = new ProxyStore(initialColorValue, colorList[0]);

