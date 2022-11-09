import type { EffectFunction, Ref } from '~/types/utils/reactive';

/**
 * ref
 * @param initValue 초기값
 * @note
 * - 상태 변경을 추적하는 반응형 값입니다.
 * - .value로 값에 접근할 수 있습니다.
 * - (ex) const numRef = ref<number>(0); num.value = 10;
 */
export const ref = <T>(initValue: T): Ref<T> => new Proxy(
  {
    value: initValue,
    _effects: [],
    _addEffect (effectFunction) {
      this._effects.push(effectFunction);
    },
    _runEffect (newValue) {
      this._effects.forEach((effectFunction: EffectFunction) => effectFunction(newValue));
    }
  }, {
    set (target: Ref<T>, prop: string, newValue: T, ...args) { // 내부 메서드 : [[Set]], 프로퍼티를 쓸 때
      target._runEffect(newValue);
      return Reflect.set(target, prop, newValue, ...args);
    }
  });

/**
 * watch
 * @param refValue 상태 변경을 감지할 ref 객체
 * @param effectFunction 상태 변경에 따라 실행할 함수
 * @note
 * - 반응형 값이 변경되면, 자동으로 effectFunction이 실행됩니다.
 * - effectFunction의 인자에서 ref에 새롭게 할당된 값에 접근할 수 있습니다.
 * - (ex) watch(numRef, (newNumber) => console.log(newNumber))
 */
export const watch = (refValue: Ref, effectFunction: EffectFunction): void => {
  refValue._addEffect(effectFunction);
};

/**
 * computed
 * @param refValue 상태 변경을 감지할 ref 객체
 * @param effectFunction 상태 변경에 따라 실행할 함수
 * @note
 * - 반응형 값이 변경되면, 자동으로 effectFunction이 실행되고 computed 값이 변경됩니다.
 * - .value로 값에 접근할 수 있습니다.
 * - effectFunction의 인자에서 ref에 새롭게 할당된 값에 접근할 수 있습니다.
 * - (ex) const add10 = computed(numRef, (newNumber) => newNumber + 10)
 */
export const computed = <RefValue, Value>(refValue: Ref<RefValue>, effectFunction: EffectFunction): {
  readonly value: Value
} => {
  let _value: Value = effectFunction(refValue.value) as Value;

  const setValue = (newValue: RefValue): void => {
    _value = effectFunction(newValue) as Value;
  };

  refValue._addEffect(setValue);

  return {
    get value (): Value {
      return _value;
    }
  };
};
