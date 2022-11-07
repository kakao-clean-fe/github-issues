import FunctionComponent from './FunctionComponent';
import { pipe } from './util';
import { IItemStore } from '../model/ItemStore';
import { IStore } from '../model/Store';

export default (store: IStore<IItemStore>) => {
  return pipe(FunctionComponent, store.subscribe)();
};
