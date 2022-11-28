export class AbortControllerManager {
  abortControllerMap = new Map(); // todo WeakMap 사용해보기

  getControllerKey(url, method='GET') {
    return url + ' ' + method;
  }
  
  getSignal(key) {
    // checkIsRequesting
    let target = this.abortControllerMap.get(key);
    
    if (!target) {
      this.abortControllerMap.set(key, new AbortController());
    } else {
      target.abort();
      this.abortControllerMap.set(key, new AbortController());
    }

    return this.abortControllerMap.get(key).signal;
  }
}