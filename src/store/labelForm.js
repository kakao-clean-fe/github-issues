import { showLabelFormFirst, TEMP_LABEL_FORM_DATA_KEY } from "../const";
import { colorList } from "../const";
import { getFormStorage } from "../util/feature";
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

const _formStorage = getFormStorage();
const formStorage = {
  set(prop, value) {
    if (prop === 'isCreating') {
      return;
    }

    const oldVal = _formStorage.get() ?? JSON.stringify({});

    const newValue = JSON.parse(oldVal);
    newValue[prop] = value ?? '';

    _formStorage.set(JSON.stringify(newValue));
  }
}

export const formData$ = new Proxy(initialFormData, {
  set(obj, prop, value, receiver) {
    if (obj[prop] === value) {
      return true;
    }

    prop === 'name' && formHandlers.setNameObservers.run(value);
    prop === 'isCreating' && formHandlers.setIsCreatingObservers.run(value);

    formStorage.set(prop, value)
    Reflect.set(obj, prop, value, receiver);
    return true;
  }
})