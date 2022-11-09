import { getIssues } from '~/store/action';
import { filterOpenedIssues } from '~/utils/issue';
import { ROOT_SELECTOR, ISSUE_LIST_SELECTOR } from '~/constants/selector';
import type { Issue } from '~/types/issue';
import { initIssuePageLayout } from '~/components/issue-page-layout';
import { initIssueListComponent } from '~/components/issue-list';
import { initIssueCountComponent } from '~/components/issue-count';

const main = async () => {
  const issues: Issue[] = await getIssues();
  initIssuePageLayout({ parentSelector: ROOT_SELECTOR });
  initIssueListComponent({ parentSelector: ISSUE_LIST_SELECTOR, issues: filterOpenedIssues(issues) });
  initIssueCountComponent({ issues });
};

main().catch((error) => { console.error(error); });
