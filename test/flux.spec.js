import { describe, it, assert, expect, test } from 'vitest'
import { Store } from '../src/flux/store';

describe('store test', () => {
  it('number test', () => {
    const actionNames = { increment: 'increment' };
    const store = new Store({
      actionNames,
      initialState: { count: 0, },
      reducer: (state, action) => (
        action.name === actionNames.increment ? { ...state, count: state.count + action.payload } : state
      ),
    });
    store.dispatch({ name: actionNames.increment, payload: 10 });
    expect(store.getState().count).toBe(10);
  });

  it('array push test', () => {
    const actionNames = { push: 'push' };
    const store = new Store({
      actionNames,
      initialState: { items: [1, 2, 3], },
      reducer: (state, action) => (
        action.name === actionNames.push ? { ...state, items: [...state.items, action.payload] } : state
      ),
    });
    store.dispatch({ name: actionNames.push, payload: 10 });
    expect(store.getState().items).toEqual([1, 2, 3, 10]);
  })

  it('array pop test', () => {
    const actionNames = { pop: 'pop' };
    const store = new Store({
      actionNames,
      initialState: { items: [1, 2, 3], },
      reducer: (state, action) => (
        action.name === actionNames.pop ? { ...state, items: state.items.slice(0, -1) } : state
      ),
    });
    store.dispatch({ name: actionNames.pop, payload: 10 });
    expect(store.getState().items).toEqual([1, 2]);
  });

  it('object test', () => {
    const actionNames = { setItem: 'setItem' };
    const store = new Store({
      actionNames,
      initialState: { object: { hello: 'world' }, },
      reducer: (state, action) => (
        action.name === actionNames.setItem ? { ...state, object: { ...state.object, ...action.payload } } : state
      ),
    });
    store.dispatch({ name: actionNames.setItem, payload: { jordan: 'song' } });
    expect(store.getState().object.jordan).toBe('song');
  })
})