import { Item } from '../../types';
import FunctionComponent from '../common/FunctionComponent';
import { getIssueItemTpl } from '../common/tpl';

// issue의 view 에 관한 로직만
const Issue = (item: Item) => {
  const { getRoot, setComponent } = FunctionComponent();
  setComponent(() => getIssueItemTpl(item), document.createElement('div'));
  return getRoot().innerHTML;
};

export default Issue;
