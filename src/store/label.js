import {createStoreObservable, ProxyStore} from './proxy';
import {getPromiseData} from './default';
import {labelPage} from '../page/label';

export const colorList = [
  '#DC3535', '#f97516', '#fcd34d', '#22c55e', '#EE6983',
  '#38bef8', '#4649FF', '#fde047', '#eef1ff', '#b1b2ff',
];

/**
 * week2 객체 지향 프로그래밍
 * label 관련
 */
export let labelStore$ = null;
export const getLabelStore$ = (watchers) => {
  getPromiseData('../../data-sources/labels.json').then((labels = []) => {
    labelStore$ = createStoreObservable(labels, watchers);
  });
}

const initialColorValue = {
  colors: new Set(colorList),
  cur: colorList[0],
  next: null,
  temp: null,
};
// to do
export const newLabelColorStore$ = new ProxyStore(initialColorValue, colorList[0]);

