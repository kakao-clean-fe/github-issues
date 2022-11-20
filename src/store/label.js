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
  this.httpRequest = fetchStoreData(this);
}
/**
 * Object.create(object) creates an object with a prototype of the
 * passed in object.
 */
createLabelStore.prototype = Object.create(Observable.prototype);
createLabelStore.constructor = createLabelStore;
createLabelStore.prototype.fetchLabels = function() {
  this.httpRequest('/labels')();
}
createLabelStore.prototype.updateLabels = function() {
  this.httpRequest('/labels-delay')(); // GET은 setValue에서 notify
}
createLabelStore.prototype.add = async function(newLabel) {
  const {status, data, isAborted, isOtherError} = await this.httpRequest('/labels')('POST', newLabel);

  if (isAborted || isOtherError) {
    return;
  }

  if (status !== 201) {
    console.error(`label 추가 실패, status: ${status}`)
    alert('label 추가에 실패했습니다. 다시 시도해주세요.');
    return;
  }
  
  /**
   * todo. 일단 새로운 라벨을 추가로 그리기만 해도 되는지 확인
   * 전체 라벨을 그린다면 fetchStoreData 함수 > POST일 때 setValue 추가
   */
  const newLabelRes = data[data.length-1];
  this.value.push(newLabelRes);
  this.notifyAddObservers(newLabelRes);
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

