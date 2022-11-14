/**
 * week2. 객체 지향 프로그래밍 - proxy
 * addWatchers
 */
export const runObserver = (observerList) => (target) => observerList.forEach(observer => observer(target));

/**
 * 기본형
 */
export const createStoreObservable = (target, observerList) => {
  runObserver(observerList)(target);

  const observable = new Proxy(target, {
    set(obj, prop, value, receiver) {
      if (obj[prop] !== value) {
        Reflect.set(obj, prop, value, receiver);
        runObserver(observerList)(target);
      }
      return true;
    }
  });

  return observable;
}

export const updateProperty = ({obj, prop, value, receiver, callback}) => {
  if (obj[prop] !== value) {
    Reflect.set(obj, prop, value, receiver);
    callback && callback();
  }
  
  return true;
}