import { newLabelColorStore$ } from './color';
import { Observable, ObserverArray } from './observable';
import { ApiService } from '../util/httpService';
import { HttpError } from '../util/errors';
import { ADD_LABEL_ERROR_MESSAGE } from '../const';

/**
 * week2 객체 지향 프로그래밍
 * label 관련
 */
function createLabelStore(initialValue) {
  // Observable의 constructor 로직 실행
  Observable.call(this, initialValue);
  this.addObserverList = new ObserverArray(); // 라벨 추가에 대한 observer
  this.apiService = new ApiService();
}
/**
 * Object.create(object) creates an object with a prototype of the
 * passed in object.
 */
createLabelStore.prototype = Object.create(Observable.prototype);
createLabelStore.constructor = createLabelStore;
createLabelStore.prototype.fetchLabels = async function() {
  try {
    const data = await this.apiService.getLabels();
    
    this.setValue(data);

  } catch(err) {}
}
createLabelStore.prototype.updateLabels = async function() {
  try {
    const data = await this.apiService.getDelayedLabels();

    this.setValue(data);

  } catch(err) {}
}
/**
 * 호출하는 쪽에서 성공, 실패 처리
 */
createLabelStore.prototype.add = async function(newLabel) {
  try {
    const data = await this.apiService.postLabel(newLabel);
    const newLabelRes = data[data.length-1];

    this.value.push(newLabelRes);
    this.notifyAddObservers(newLabelRes);

    /**
     * labelStore에 새로운 color 추가 (set이라 일단 add)
     */
    const color = newLabelRes.color;
    color && newLabelColorStore$.colors.add(color.toUpperCase());
  } catch(err) {
    if (err instanceof HttpError) {
      console.error(`label 추가 실패, status: ${err.statusCode}`)
      alert(ADD_LABEL_ERROR_MESSAGE);
      return;
    }
    // 다른 에러는 처리하지 않음, 로그만 남김
  }
}

createLabelStore.prototype.subscribeAdd = function(observers = []) {
  this.addObserverList.add(observers);
}

createLabelStore.prototype.notifyAddObservers = function(newValue) {
  this.addObserverList.run(newValue);
}

/** override */
createLabelStore.prototype.unsubscribe = function(observers = []) {
  this.observerList.remove(observers);
  this.addObserverList.remove(observers);
}

export const labelStore$ = new createLabelStore([]);
