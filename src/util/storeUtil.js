import {pipe} from './componentUtil';

/** STORE */
export const store = (initialValue) => {
  let currentValue = initialValue;
  let watchers = [];

  return {
    getValue() {
      return currentValue;
    },
    setValue(newValue) {
      if (currentValue !== newValue) {
        currentValue = newValue;
        watchers.forEach(watcher => watcher(newValue));
      }

    },
    addWatchers(newWatchers) {
      newWatchers.forEach(watcher => watchers.push(watcher));
    }
  }
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
    }
  }
}

const getPromiseData = (url) => {
  return fetch(url).then(res => res.json())
}

export const fetchData = (url) => (store) => {
  getPromiseData(url).then(data => store.setValue(data));
}