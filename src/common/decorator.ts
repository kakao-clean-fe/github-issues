import { getTimeByKor } from './util';

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
          localStorage.setItem(key, value);
        }
        return this;
      }
      build() {
        return new target(this);
      }
    };
  };
}
export const Logger = {
  errorLogger() {
    return function (target, propertyKey, descriptor) {
      const targetMethod = target[propertyKey];
      descriptor.value = function (error: Error) {
        console.groupCollapsed(`[data fetch error] `, getTimeByKor(new Date()));
        console.error('error', error);
        console.groupEnd();
        targetMethod(error);
      };

      return descriptor;
    };
  },
  fetchLogger(props?: { fetchingTimeLogging: boolean }) {
    const { fetchingTimeLogging = false } = props || {};
    return function (target, propertyKey, descriptor) {
      const targetMethod = target[propertyKey];
      descriptor.value = async function (...res) {
        let _res;
        let start;
        try {
          if (fetchingTimeLogging) {
            start = new Date().getTime();
          }
          _res = await targetMethod(...res);
          const end = new Date().getTime();
          if (_res) {
            console.groupCollapsed(
              `[data fetch end] `,
              getTimeByKor(new Date()),
              res[0].method,
              res[0].url,
              fetchingTimeLogging ? `(${(end - start) / 1000} sec)` : ''
            );
            console.log('data', _res);
            console.groupEnd();
          }
        } catch (error) {
          console.error(`[data fetch error]`);
        }
        return _res;
      };
      return descriptor;
    };
  },
};
