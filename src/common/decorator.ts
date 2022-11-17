export function builder(...keys) {
  return (target) => {
    target.builder = class {
      constructor(props) {
        if (props) {
          keys.forEach((key) => {
            this.setData(key, props[key]);
          });
        }
      }
      setData(key, value) {
        if (keys.includes(key)) {
          this[key] = value;
        }
        return this;
      }
      build() {
        return new target(this);
      }
    };
    window['a'] = target;
  };
}
