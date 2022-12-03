import { describe, expect, test, vi } from 'vitest';
import { ref, watch, computed } from '../../utils/reactive';

describe('ref()', () => {
  test('.value로 값을 가져올 수 있다.', () => {
    // given
    const EXPECTED_VALUE = 10;

    // when
    const numRef = ref(EXPECTED_VALUE);

    // then
    expect(numRef.value).toBe(EXPECTED_VALUE);
  });
  test('.value로 값을 변경할 수 있다.', () => {
    // given
    const VALUE = 10;
    const EXPECTED_VALUE = 20;
    const numRef = ref(VALUE);

    // when
    numRef.value += 10;

    // then
    expect(numRef.value).toBe(EXPECTED_VALUE);
  });
  test('값이 기존값과 다른 값으로 변경되면, 이를 감지하는 effect 함수들이 실행된다.', () => {
    // given
    const effectFunction = vi.fn();
    const numRef = ref(0);
    numRef._addEffect(effectFunction);

    // when
    numRef.value++;

    // then
    expect(effectFunction).toHaveBeenCalled();
  });
  test('값이 기존값과 같은 값으로 변경되면, 이를 감지하는 effect 함수들이 실행되지 않는다.', () => {
    // given
    const effectFunction = vi.fn();
    const numRef = ref(0);
    numRef._addEffect(effectFunction);

    // when
    numRef.value += 0;

    // then
    expect(effectFunction).not.toHaveBeenCalled();
  });
  test('값이 변경될 때 실행되는 effect 함수는 첫 번째 인자로 변경된 값을 받는다.', () => {
    // given
    const EXPECTED_VALUE = 10;
    const effectFunction = vi.fn();
    const numRef = ref(0);
    numRef._addEffect(effectFunction);

    // when
    numRef.value = EXPECTED_VALUE;

    // then
    expect(effectFunction.mock.calls[0][0]).toBe(EXPECTED_VALUE);
  });
});

describe('watch()', () => {
  test('ref가 변경되기 전에는, watch로 등록한 함수가 실행되지 않는다.', () => {
    // given
    const numRef = ref(0);
    const effectFunction = vi.fn();

    // when
    watch(numRef, effectFunction);

    // then
    expect(effectFunction).not.toHaveBeenCalled();
  });
  test('ref가 변경되면, watch로 등록한 함수가 실행된다.', () => {
    // given
    const numRef = ref(0);
    const effectFunction = vi.fn();

    // when
    watch(numRef, effectFunction);
    numRef.value++;

    // then
    expect(effectFunction).toHaveBeenCalled();
  });
  test('ref가 변경되면, watch로 등록한 함수의 첫 번째 인자로 변경된 값을 받는다.', () => {
    // given
    const EXPECTED_VALUE = 10;
    const numRef = ref(0);
    const effectFunction = vi.fn();

    // when
    watch(numRef, effectFunction);
    numRef.value = EXPECTED_VALUE;

    // then
    expect(effectFunction.mock.calls[0][0]).toBe(EXPECTED_VALUE);
  });
  test('ref가 변경되면, watch로 등록한 함수의 두 번째 인자에는 변경되기 전의 값을 받는다.', () => {
    // given
    const PREV_VALUE = 0;
    const NEW_VALUE = 10;
    const numRef = ref(PREV_VALUE);
    const effectFunction = vi.fn();

    // when
    watch(numRef, effectFunction);
    numRef.value = NEW_VALUE;

    // then
    expect(effectFunction.mock.calls[0][1]).toBe(PREV_VALUE);
  });
});

describe('computed()', () => {
  test('ref가 변경되면, 콜백의 첫번째 인자는 변경된 값이다.', () => {
    // given
    const numArrRef = ref([]);
    const EXPECTED_VALUE = [0];
    const effectFunction = vi.fn();

    // when
    computed(numArrRef, effectFunction);
    numArrRef.value = EXPECTED_VALUE;

    // then
    expect(effectFunction).toHaveBeenCalled(EXPECTED_VALUE);
  });
  test('ref가 변경되면, .value로 원하는 값을 가져올 수 있다.', () => {
    // given
    const numArrRef = ref([]);
    const EXPECTED_VALUE = [0, 2, 4];

    // when
    const evenArr = computed(numArrRef, (newValues) => {
      return newValues.filter(value => value % 2 === 0);
    });
    numArrRef.value = [0, 1, 2, 3, 4];

    // then
    expect(evenArr.value).toEqual(EXPECTED_VALUE);
  });
});
