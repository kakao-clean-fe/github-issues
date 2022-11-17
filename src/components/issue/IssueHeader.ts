import FunctionComponent from '../../common/FunctionComponent';
import { getIssueHeaderTpl } from '../../common/tpl';

const IssueHeader = () => {
  const app = FunctionComponent();
  const appDiv = document.createElement('div');
  const { setComponent, getRoot } = app;
  return setComponent(() => getIssueHeaderTpl(), appDiv);
};

export default IssueHeader;
