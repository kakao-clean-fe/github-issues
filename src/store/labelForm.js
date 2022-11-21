import { showLabelFormFirst } from "../const";
import { colorList } from "./label";
import { ObserverArray } from "./observable";

/**
 * new Label Form을 dynamic import하기 위해 store 함수 분리
 */
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