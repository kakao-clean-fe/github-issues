import { showLabelFormFirst } from "../const";
import { colorList } from "./label";

/**
 * new Label Form을 dynamic import하기 위해 store 함수 분리
 */

function ObserverArray() {
  this.observers = [];
}

ObserverArray.prototype.add = function(_observers = []) {
  _observers.forEach(observer => this.observers.push(observer));
}

ObserverArray.prototype.run = function(value) {
  value !== undefined && this.observers.forEach(observer => observer(value));
}

const initialFormData = {
  isCreating: showLabelFormFirst,
  name: '',
  description: '',
  color: colorList[0],
};

export const formHandlers = {
  setNameObservers: new ObserverArray(),
  addSetNameObserver(observers=[]) {
    this.setNameObservers.add(observers);
  },
  setIsCreatingObservers: new ObserverArray(),
  addSetIsCreatingObservers(observers=[]) {
    this.setIsCreatingObservers.add(observers);
  }
}

export const formData$ = new Proxy(initialFormData, {
  set(obj, prop, value, receiver) {
    if (obj[prop] === value) {
      return true;
    }

    prop === 'name' && formHandlers.setNameObservers.run(value);
    prop === 'isCreating' && formHandlers.setIsCreatingObservers.run(value);

    Reflect.set(obj, prop, value, receiver);
    return true;
  }
})