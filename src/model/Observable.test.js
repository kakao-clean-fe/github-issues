import Observable from "./Observable"

describe('Observable', () => {
  let observable;
  beforeEach(() => {
    observable = new Observable();
  })

  test('동일한 옵저버는 두번 등록되지 않는다.', () => {
    const observer = () => {};

    observable.subscribe(observer)
    observable.subscribe(observer)
    
    expect(observable._observers.size).toBe(1);
  })

  test('상태 변경시 옵저버들에게 상태가 전파된다.', () => {
    let stateA;
    let stateB;
    
    const observerA = (s) => stateA = s;
    const observerB = (s) => stateB = s;
    
    observable.subscribe(observerA);
    observable.subscribe(observerB);
    
    let state = {key: 'value'};
    observable.setState(state);

    expect(state).toEqual(stateA);
    expect(state).toEqual(stateB);
  })

  test('구독취소하면 상태가 전파되지 않는다.', () => {
    let stateA = null;
    const observer = (s) => stateA = s;

    observable.subscribe(observer);
    observable.unsubscribe(observer);

    observable.setState('new state');

    expect(stateA).toBeNull();
  })
})