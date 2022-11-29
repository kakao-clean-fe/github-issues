import { deepCopy } from '../util';

// export class EventBus extends EventTarget {
//   constructor() {
//     super();
//   }
//   on(key, listener) {
//     this.addEventListener(key, listener);
//   }
//   off(key, listener) {
//     this.removeEventListener(key, listener);
//   }
//   emit(key, data) {
//     this.dispatchEvent(new CustomEvent(key, { detail: data }));
//   }
// }

// export class Store {
//   constructor({ eventBus, initialState }) {
//     this.eventBus = eventBus;
//     this.state = new Proxy(initialState, {
//       get(target, propertyKey, receiver) {
//         return Reflect.get(target, propertyKey, receiver);
//       },
//       set(target, propertyKey, newValue, receiver) {
//         if (!Reflect.has(initialState, propertyKey)) {
//           return false;
//         }
//         eventBus.emit(propertyKey, newValue);
//         return Reflect.set(target, propertyKey, newValue, receiver);
//       },
//     });
//   }
//   useState(key) {
//     return [
//       this.state[key],
//       (props) => {
//         const prevValue = this.state[key];
//         if (typeof props === 'function') {
//           this.state[key] = props(prevValue);
//         } else {
//           this.state[key] = props;
//         }
//       },
//     ];
//   }
//   useEffect(key, listener) {
//     this.eventBus.on(key, listener);
//     return () => {
//       this.eventBus.off(key, listener);
//     };
//   }
// }

export class PubSub {
  constructor() {
    this.subscriber = new Map();
  }
  publish(topic, data) {
    const listeners = this.subscriber.get(topic);
    if (!this.subscriber.has(topic)) {
      return;
    }
    listeners.forEach(listener => listener(data));
  }
  subscribe(topic, listener) {
    if (!this.subscriber.has(topic)) {
      this.subscriber.set(topic, []);
    }
    this.subscriber.get(topic).push(listener);
    return () => {
      this.unsubscribe(topic, this.subscriber.get(topic).length - 1);
    }
  }
  unsubscribe(topic, index) {
    this.subscriber.get(topic).splice(index, 1);
  }
}

export class Store {
  constructor({ initialState, reducer, actionNames }) {
    this.pubSub = new PubSub();
    this.state = initialState;
    this.reducer = reducer;
    this.actionNames = actionNames;
  }
  getState(stateSelector) {
    const copiedState = deepCopy(this.state);
    if (typeof stateSelector === 'function') {
      return stateSelector(copiedState);
    }
    return copiedState;
  }
  addActionListener(listener, actionSelector) {
    try {
      this.getActionNamesFrom(actionSelector).forEach(actionName => {
        this.pubSub.subscribe(actionName, listener)
      });
    } catch (error) {
      console.error(error);
    }
  }
  dispatch(action) {
    const nextState = this.reducer(this.state, action);
    this.state = nextState;
    this.pubSub.publish(action.name, nextState)
  }
  getActionNamesFrom(actionSelector) {
    if (typeof actionSelector === 'function') {
      return actionSelector(this.actionNames);
    } else if (Array.isArray(actionSelector)) {
      return actionSelector;
    } else {
      throw new Error('Fail to subscribe actions. Actions must be selector function or array');
    }
  }
}
