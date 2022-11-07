import { getIssues } from '~/store/action';
import { filterOpenedIssues } from '~/utils/issue';
import { ROOT_SELECTOR, ISSUE_LIST_SELECTOR } from '~/constants/selector';
import type { Issue } from '~/types/issue';
import { IssuePageLayout } from '~/components/issue-page-layout';
import { IssueList } from '~/components/issue-list';
import { IssueCount } from '~/components/issue-count';

const main = async () => {
  const issues: Issue[] = await getIssues();
  IssuePageLayout({ parentSelector: ROOT_SELECTOR });
  IssueList({ parentSelector: ISSUE_LIST_SELECTOR, issues: filterOpenedIssues(issues) });
  IssueCount({ issues });
};

main().catch((error) => { console.error(error); });
