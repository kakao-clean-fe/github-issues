import { describe, it, assert, expect, test } from 'vitest'
import { createActionsFrom } from '../src/flux/action';
import { Store } from '../src/flux/store';

const initialState = {
  count: 0,
  list: [1, 2, 3],
  obj: { hello: 'world' },
}
const actionNames = {
  increment: 'increment',
  push: 'push',
  setItem: 'setItem',
};
const actions = createActionsFrom(actionNames);

function reducer(state, action) {
  const { name, payload } = action;
  switch (name) {
    case actionNames.increment:
      return { ...state, count: state.count + payload };
    case actionNames.push:
      return { ...state, list: [...state.list, payload] };
    case actionNames.setItem:
      return { ...state, obj: { ...state.obj, ...payload } };
    default:
      console.error(`Invalid action name(${name})`)
      return state;
  }
}

describe('flux test', () => {
  it('action test', () => {
    expect(actions.increment(3)).toEqual({ name: actionNames.increment, payload: 3 });
    expect(actions.push('item')).toEqual({ name: actionNames.push, payload: 'item' });
    expect(actions.setItem({ k: 'v' })).toEqual({ name: actionNames.setItem, payload: { k: 'v' } });
  });

  it('reducer test', () => {
    const increasedState = reducer(initialState, actions.increment(10));
    expect(increasedState.count).toEqual(10);

    const pushedState = reducer(initialState, actions.push(10));
    expect(pushedState.list).toEqual([1, 2, 3, 10]);

    const settedState = reducer(initialState, actions.setItem({ jordan: 'song' }));
    expect(settedState.obj.jordan).toEqual('song');
  });

  it('store test', () => {
    const store = new Store({ initialState, reducer, actionNames });
    store.dispatch(actions.increment(1234));
    expect(store.getState().count).toEqual(1234);

    store.dispatch(actions.push(20));
    expect(store.getState().list).toEqual([1, 2, 3, 20]);

    store.dispatch(actions.setItem({ song: 'kr' }));
    expect(store.getState().obj.song).toEqual('kr');
  })
})