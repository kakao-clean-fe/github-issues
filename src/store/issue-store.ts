import { ref, computed, watch } from '~/utils/reactive';
import { SERVER_URL } from '~/env';
import { getApi } from '~/utils/api';
import { filterOpenedIssues, filterClosedIssues } from '~/utils/issue';
import { pipe } from '~/utils/functional-util';
import type { Issue, Status } from '~/types/issue';
import type { EffectFunction } from '~/types/utils/reactive';

// ==========================
// state, getter, watcher helper, action
// - 반응형 값(ref)을 선언합니다.
// - 반응형 값은 getter를 통해서만 접근할 수 있습니다.
// - 반응형 값이 변경되면 실행할 watcher를 등록할 함수를 제공합니다.
// - 반응형 값은 action을 통해서만 변경할 수 있습니다.
// ==========================

// issues
const issuesRef = ref<Issue[]>([]);
export const issues = (): Issue[] => issuesRef.value;
export const setIssuesWatcher = (effectFunction: EffectFunction): void => watch(issuesRef, effectFunction);
export const setIssues = (issues: Issue[]): void => { issuesRef.value = issues; };

const fetchIssues = async (): Promise<Issue[]> => {
  const PATH = '/data-sources/issues.json';

  return await getApi<Issue[]>({ url: `${SERVER_URL}${PATH}` });
};

export const fetchAndSetIssues = (): void => {
  fetchIssues()
    .then(setIssues)
    .catch((error) => console.error(error));
};

// issuesToRender
const issuesToRenderRef = ref<Issue[]>([]);
export const issuesToRender = (): Issue[] => issuesToRenderRef.value;
export const setIssuesToRenderWatcher = (effectFunction: EffectFunction): void => watch(issuesToRenderRef, effectFunction);
export const setIssuesToRender = (newIssuesToRender: Issue[]): void => { issuesToRenderRef.value = newIssuesToRender; };

// issueQuery
interface IssueQuery {status: Status}
const issueQueryRef = ref<IssueQuery>({ status: 'open' });
export const issueQuery = (): IssueQuery => issueQueryRef.value;
export const setIssueQueryWatcher = (effectFunction: EffectFunction): void => watch(issueQueryRef, effectFunction);
export const setIssueQuery = (newQuery: IssueQuery): void => { issueQueryRef.value = { ...issueQueryRef.value, ...newQuery }; };

// ==========================
// computed
// - computed는 getter를 통해서만 접근할 수 있습니다.
// ==========================
const openedIssuesRef = computed<Issue[], Issue[]>(issuesRef, filterOpenedIssues);
export const openedIssues = (): Issue[] => openedIssuesRef.value;

const closedIssuesRef = computed<Issue[], Issue[]>(issuesRef, filterClosedIssues);
export const closedIssues = (): Issue[] => closedIssuesRef.value;

// ==========================
// watch
// - ref가 변경되면 실행할 함수입니다.
// ==========================

const getFilteredIssuesByIssueQuery = (issueQuery: IssueQuery): Issue[] => issueQuery.status === 'open' ? openedIssues() : closedIssues();
const filterByQueryAndSetIssuesToRender = (issueQuery: IssueQuery): void => {
  pipe(
    getFilteredIssuesByIssueQuery,
    setIssuesToRender
  )(issueQuery);
};

setIssueQueryWatcher((newIssueQuery: IssueQuery) => {
  filterByQueryAndSetIssuesToRender(newIssueQuery);
});

setIssuesWatcher(() => {
  filterByQueryAndSetIssuesToRender(issueQuery());
});
