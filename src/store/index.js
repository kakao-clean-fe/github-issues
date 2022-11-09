import { pipe } from "../utils";

const createStore = (initialState) => {
  let state = initialState;
  
  const setState = (newState) => {
    state = newState;
    emmitChanges();
  };
  const getState = () => state;
  
  let listeners = [];
  const removeChangeListener = (listener) => listeners.filter(li !== listener);
  const addChangeListener = (...listener) => {
    const listenerPipe = pipe(...listener);
    listenerPipe(state);
    listeners.push(listenerPipe);
    return () => removeChangeListener(listenerPipe);
  };
  const emmitChanges = () => {
    listeners.forEach((li) => li(state));
  };
 
  return {
    setState,
    getState,
    addChangeListener,
  }
}

export default createStore;