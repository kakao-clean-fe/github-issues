import FunctionComponent, { IFunctionComponent } from './FunctionComponent';
import { pipe } from './util';
import { IItemStore } from '../model/ItemStore';
import { IStore } from '../model/Store';

export default <T = any>(
  store: IStore<T>
): IFunctionComponent & { getData: () => T; setData: (data: T) => void } => {
  return pipe(FunctionComponent, store.subscribe)();
};
