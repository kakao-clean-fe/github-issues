export class EventBus extends EventTarget {
  constructor() {
    super();
  }
  on(key, listener) {
    this.addEventListener(key, listener);
  }
  off(key, listener) {
    this.removeEventListener(key, listener);
  }
  emit(key, data) {
    this.dispatchEvent(new CustomEvent(key, { detail: data }));
  }
}

export class Store {
  constructor({ eventBus, initialState }) {
    this.eventBus = eventBus;
    this.state = new Proxy(initialState, {
      get(target, propertyKey, receiver) {
        return Reflect.get(target, propertyKey, receiver);
      },
      set(target, propertyKey, newValue, receiver) {
        if (!Reflect.has(initialState, propertyKey)) {
          return false;
        }
        eventBus.emit(propertyKey, newValue);
        return Reflect.set(target, propertyKey, newValue, receiver);
      },
    });
  }
  useState(key) {
    return [
      this.state[key],
      props => {
        const prevValue = this.state[key];
        if (typeof props === 'function') {
          this.state[key] = props(prevValue);
        } else {
          this.state[key] = props;
        }
      },
    ];
  }
  useEffect(key, listener) {
    this.eventBus.on(key, listener);
    return () => {
      this.eventBus.off(key, listener);
    };
  }
}
