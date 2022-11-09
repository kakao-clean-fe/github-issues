import { getIssueItemTpl, getIssueTpl } from './tpl';
import { fetchIssues } from './common/api';
import { OPEN, CLOSED } from './constants/status';
import { SELECTOR } from './constants/selector';
import { getIssuesWithStatus } from './utils/status';
import { createIssue, createIssueList, updateIssueList, boldToStatusButton } from './utils/template';
import { hasClass } from './utils/dom';
import { pipe } from './utils/pipe';
import { bindClickEvent } from './utils/event';

const renderIssue = (issues) => {
  /** 데이터 가져오기 */
  const getIssues = getIssuesWithStatus(issues);
  const openIssues = getIssues(OPEN);
  const closedIssues = getIssues(CLOSED);

  /** issueTemplate 그리기 */
  pipe(getIssueTpl, createIssue)({openIssueCount: openIssues.length, closedIssueCount: closedIssues.length});

  /** issueItemTemplate 그리기 */
  const getIssueListTableTemplate = issues => issues
    .map(issue => getIssueItemTpl(issue))
    .join('');

  pipe(getIssueListTableTemplate, createIssueList)(issues);
};

const clickStatusTab = ({target}) => {
  const OPEN_COUNT_CLASS = '_open_count';
  const isOpenCountButton = hasClass(OPEN_COUNT_CLASS);
  const status = isOpenCountButton(target) ? OPEN : CLOSED;
  boldToStatusButton(status);

  return status; // status가 문맥에 맞는 반환인지 고려해야함
};

const setStatusTabEvent = issues => {
  /** 이벤트 바인딩 */
  const bindTabClickEvent = bindClickEvent(SELECTOR.STATUS_TAB);
  bindTabClickEvent(
    clickStatusTab,
    getIssuesWithStatus(issues), // currying 함수
    updateIssueList,
  );
};

const init = async (issues) => {
  await renderIssue(issues);
  setStatusTabEvent(issues);
}

const main = async () => {
  const issues = await fetchIssues();

  init(issues);
};

main();
