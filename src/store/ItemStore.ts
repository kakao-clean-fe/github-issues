import { Item, Status } from '../../types';
import Store from './Store';
export interface IItemStore {
  initData: Item[];
  selectedFilter: Status | '';
}
const itemStore = Store<IItemStore>({
  initData: [],
  selectedFilter: '',
});
export { itemStore };
