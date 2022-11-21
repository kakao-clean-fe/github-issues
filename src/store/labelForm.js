import { showLabelFormFirst } from "../const";
import { colorList } from "../const";
import { newLabelColorStore$ } from "./color";
import { ObserverArray } from "./observable";

/**
 * proxy로 만든 store는 따로 만든 handler에 observer 등록
 */
const initialFormData = {
  isCreating: showLabelFormFirst,
  name: '',
  description: '',
  color: null,
};

export const formHandlers = {
  setNameObservers: new ObserverArray(),
  addSetNameObserver(observers=[]) {
    this.setNameObservers.add(observers);
  },
  setIsCreatingObservers: new ObserverArray(),
  addSetIsCreatingObservers(observers=[]) {
    this.setIsCreatingObservers.add(observers);
  },
  setColorObservers: new ObserverArray(),
  addSetColorObservers(observers=[]) {
    this.setColorObservers.add(observers);
  },
  setDescriptionObservers: new ObserverArray(),
  addSetDescriptionObservers(observers=[]) {
    this.setDescriptionObservers.add(observers);
  },
}

export const formData$ = new Proxy(initialFormData, {
  set(obj, prop, value, receiver) {
    if (obj[prop] === value) {
      return true;
    }

    prop === 'name' && formHandlers.setNameObservers.run(value);
    prop === 'isCreating' && formHandlers.setIsCreatingObservers.run(value);
    
    /**
     * input은 formData$.color만 변경
     * SET formData$.color는 labelColorStore$ 변경
     */
    if (prop === 'color') {
      newLabelColorStore$.cur = value;
      formHandlers.setColorObservers.run(value);
    }

    Reflect.set(obj, prop, value, receiver);
    return true;
  }
})
