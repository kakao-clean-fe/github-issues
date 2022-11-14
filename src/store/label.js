import { getRandom, isHexColor } from '../util/feature';
import {createStoreObservable} from './proxyStore';
import {renderLabelItem, renderLabelCount, renderLabelColor} from '../page/label'
import {getPromiseData} from './reusableStore';
import { showLabelFormFirst } from '../const ';

/**
 * week2 객체 지향 프로그래밍
 * label 관련
 */
export let labelStore$;
export const getLabelStore$ = () => {
  getPromiseData('../../data-sources/labels.json').then((labels = []) => {
    labelStore$ = createStoreObservable(labels, [renderLabelItem, renderLabelCount]);
  });
}

export const colorSet = new Set([
  '#DC3535', '#f97516', '#fcd34d', '#22c55e', '#EE6983',
  '#38bef8', '#4649FF', '#fde047', '#eef1ff', '#b1b2ff',
]);

const initialColorValue = {
  colors: colorSet,
  curr: null,
  next: null,
  temp: null,
}

export const newLabelColorStore$ = (function(target) {
  let _iterator = target.colors.values();
  let cur = _iterator.next().value;

  const observable = new Proxy(target, {
    get(obj, prop, receiver) {
      if (prop === 'next') {
        let data = _iterator.next();

        if (data.done) {
          _iterator = target.colors.values();
          data = _iterator.next();
        }

        cur = data.value;
        renderLabelColor(cur);
        return cur;
      }

      if (prop === 'curr') {
        return cur;
      }

      return Reflect.get(obj, prop, receiver);
    },
    set(obj, prop, value, receiver) {
      if (prop === 'colors') {
        Reflect.set(obj, prop, value, receiver);
      }

      if (prop === 'temp') {
        renderLabelColor(value); // 버튼, 라벨 프리뷰에 색 입히기
        Reflect.set(obj, prop, value, receiver);
      }

      Reflect.set(obj, prop, value, receiver);
      return true;
    }
  });

  return observable;
})(initialColorValue);
