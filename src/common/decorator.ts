export function builder(...keys) {
  return (target) => {
    target.builder = class {
      constructor(props) {
        keys.forEach((key) => {
          this.setData(key, props[key]);
        });
      }
      setData(key, value) {
        if (keys.includes(key)) {
          console.log('set', key, value, keys);
          this[key] = value;
        }
        return this;
      }
      build() {
        console.log('build', this);
        return new target(this);
      }
    };
    window['a'] = target;
  };
}
