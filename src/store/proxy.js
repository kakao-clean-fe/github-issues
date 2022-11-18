/**
 * week2. 객체 지향 프로그래밍 - proxy
 * addWatchers
 */
export const updateProperty = ({obj, prop, value, receiver, callback}) => {
  if (obj[prop] !== value) {
    Reflect.set(obj, prop, value, receiver);
    callback && callback();
  }
  
  return true;
}

/**
 * current, next value값을 받을 수 있는 스토어
 * get, set, 그리고 원하는 속성별로 watcher를 넣어주기 위해 로직이 복잡해짐
 * 프로토타입 함수도 있고 지역 함수도 있다
 */
export function ProxyStore(target, initialCurValue) {
  this.target = target;
  this._iterator = target.colors.values();
  this.cur = this._iterator.next().value ?? initialCurValue;

  /**
   * watcher가 필요한 속성들마다 watcher list를 만듦
   */
  this.getNextPropWatchers = [];
  this.setTempPropWatchers = [];

  /**
   * proxy에서 this에 접근하기 위해 지역 함수로
   */
  const getNextValue = () => {
    let data = this._iterator.next();

    if (data.done) {
      this._iterator = this.target.colors.values();
      data = this._iterator.next();
    }
  
    return data.value;
  }

  const runGetNextWatchers = (next) => {
    this.getNextPropWatchers.forEach(watcher => watcher(next));
  }

  const runSetTempWatchers = (temp) => {
    this.setTempPropWatchers.forEach(watcher => watcher(temp));
  }

  this.store = new Proxy(target, {
    get(obj, prop, receiver) {
      if (prop === 'next') {
        /**
         * next를 get하면 cur을 set한다
         */
        const next = getNextValue(); // get 따로
        Reflect.set(obj, 'cur', next, receiver); // set 따로
        
        runGetNextWatchers(next);
        return next;
      }
      
      return Reflect.get(obj, prop, receiver);
    },
    set(obj, prop, value, receiver) {
      if (prop === 'temp') {
        runSetTempWatchers(value);
      }
      
      Reflect.set(obj, prop, value, receiver);
      return true;
    }
  })
}

ProxyStore.prototype.addGetNextPropWatchers = function(_watchers = []) {
  _watchers.forEach(_watcher => this.getNextPropWatchers.push(_watcher));
};

ProxyStore.prototype.addSetTempPropWatchers = function(_watchers = []) {
  _watchers.forEach(_watcher => this.setTempPropWatchers.push(_watcher));
}
