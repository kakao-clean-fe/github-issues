import FunctionComponent from '../common/FunctionComponent';
import { getIssueHeaderTpl } from '../common/tpl';

const IssueHeader = () => {
  const app = FunctionComponent();
  const { setComponent, getRoot } = app;
  return setComponent(() => getIssueHeaderTpl(), document.createElement('div'));
};

export default IssueHeader;
