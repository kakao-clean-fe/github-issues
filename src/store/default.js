import {pipe} from '../util/operator';
import { ObserverArray } from './observable';

/** STORE */
export const store = (initialValue) => {
  let currentValue = initialValue;
  let watchers = new ObserverArray();

  const getValue = () => currentValue;
  const setValue = (newValue) => {
    if (currentValue !== newValue) {
      currentValue = newValue;
      watchers.run(newValue);
    }
  };
  const addWatchers = (newWatchers) => {
    watchers.add(newWatchers);
  }

  const removeWatchers = (targetWatchers=[]) => {
    watchers.remove(targetWatchers);
  }

  return { getValue, setValue, addWatchers, removeWatchers };
};

const updateDerivedValue = (upstreams) => (fn) => fn(...upstreams.map(upstream => upstream.getValue()));

/**
 * 2개 이상의 store에 파생하는 store
 */
export const createDerivedStore = (fn, ...upstreams) => {
  const getNewValue = () => updateDerivedValue(upstreams)(fn);
  const derived = store(getNewValue()); // create a store & set initial value

  const setNewValue = pipe(getNewValue, derived.setValue);

  upstreams.forEach(upstream => {
    upstream.addWatchers([setNewValue]); // upstream 값에 변화가 있으면 새로 값을 설정
  })

  return {
    getValue() {
      return derived.getValue();
    },
    addWatchers(newWatchers) {
      derived.addWatchers(newWatchers);
    },
    removeWatchers(targetWatchers) {
      derived.removeWatchers(targetWatchers);
    }
  }
}
