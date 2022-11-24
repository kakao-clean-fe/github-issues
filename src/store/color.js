import { colorList } from "../const";

/**
 * color store
 * current, next value값을 받을 수 있는 스토어
 */
const initialColorValue = {
  colors: new Set(colorList),
  cur: null, // next color와 같은지 확인하기 위해 현재 값을 저장
  next: null,
};

export function ProxyStore(target, initialCurValue='#8080FF') {
  this.target = target;
  this._iterator = target.colors.values();

  /**
   * proxy에서 this에 접근하기 위해 지역 함수로
   */
  const getNextValue = () => {
    if (target.colors.size === 0) {
      return initialCurValue;
    }

    let next = null;
    let data = this._iterator.next();

    while (next === null) {
      if (data.done) {
        this._iterator = this.target.colors.values();
        data = this._iterator.next();
      }

      if (data.value === target.cur) {
        data = this._iterator.next();
      }

      next = data.value;
    }
    
    return next;
  }

  return new Proxy(target, {
    get(obj, prop, receiver) {
      if (prop === 'next') {
        /**
         * next를 get하면 cur을 set한다
         */
        const next = getNextValue(); // get 따로
        Reflect.set(obj, 'cur', next, receiver); // set 따로
        
        return next;
      }
      
      return Reflect.get(obj, prop, receiver);
    },
    set(obj, prop, value, receiver) {      
      Reflect.set(obj, prop, value, receiver);
      return true;
    }
  })
}

// to do
export const newLabelColorStore$ = new ProxyStore(initialColorValue, colorList[0]);
