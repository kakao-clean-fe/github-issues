import Observable from './Observable';
import { itemStore } from '../model/ItemStore';

const itemObserver = Observable(itemStore);

export { itemObserver };
