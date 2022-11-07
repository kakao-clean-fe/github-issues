import { Item } from '../types';
import FunctionComponent from './FunctionComponent';
import { getIssueItemTpl } from './tpl';

const Issue = (item: Item) => {
  const { getRoot, setComponent } = FunctionComponent();
  setComponent(() => getIssueItemTpl(item), document.createElement('div'));
  return getRoot().innerHTML;
};

export default Issue;
