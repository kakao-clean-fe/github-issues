export function createStore(initialState = {}, reducer) {
  let state = {...initialState};

  const listeners = new Set();
  const dispatch = async (action) => {
    const prevState = {...state};
    state = await reducer(state, action);
    listeners.forEach(fn => fn(prevState, state, action));
  }

  const getState = () => ({...state});
  const subscribe = (fn) => {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    }
  }

  return {
    getState,
    dispatch,
    subscribe
  };
}
