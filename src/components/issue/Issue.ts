import FunctionComponent from '../../common/FunctionComponent';
import IssueHeader from './IssueHeader';
import IssueBody from './IssueBody';

// app의 view에 관한 로직만
const Issue = (appElement: Element) => {
  appElement.innerHTML = '';
  const app = FunctionComponent();
  const { setComponent } = app;
  const issueWrapper = document.createElement('div');
  issueWrapper.id = 'issue-wrapper';
  issueWrapper.className = 'w-9/12 m-auto min-w-min';
  appElement.appendChild(issueWrapper);
  const issueHeader = IssueHeader();
  const issueBody = IssueBody();
  return setComponent(() => '', issueWrapper, issueHeader, issueBody);
};
export default Issue;
