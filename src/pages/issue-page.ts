import { fetchAndSetIssues } from '~/store/issue-store';
import { ROOT_SELECTOR, ISSUE_LIST_SELECTOR } from '~/constants/selector';
import { initIssuePageLayout } from '~/components/issue-page-layout';
import { initIssueListComponent } from '~/components/issue-list';
import { initIssueCountComponent } from '~/components/issue-count';

export const initIssuePage = (): void => {
  fetchAndSetIssues();
  initIssuePageLayout({ parentSelector: ROOT_SELECTOR });
  initIssueListComponent({ parentSelector: ISSUE_LIST_SELECTOR });
  initIssueCountComponent();
};
