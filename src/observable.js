export default class Observable {
  
  constructor(target = {}) {
    const _handlers = Symbol('handlers');
    
    target[_handlers] = [];

    target.subscribe = function (handler) {
      this[_handlers].push(handler);
    };

    return new Proxy(target, {
      set(target, property, value) {
        const success = Reflect.set(...arguments);

        if (success) {
          target[_handlers].forEach(handler => handler(property, value));
        }

        return success;
      }
    });
  }
}