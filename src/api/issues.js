import { CloseStatus, OpenStatus } from "../constants/issues";

const IssuesDataSource =
  "https://raw.githubusercontent.com/kakao-clean-fe/github-issues/beans.go/data-sources/issues.json";

export const GetIssues = async () => {
  const response = await fetch(IssuesDataSource);
  const items = await response.json();

  return {
    opens: GenIssueFilter(items)(OpenStatus),
    closes: GenIssueFilter(items)(CloseStatus),
  };
};

export const GenIssueFilter = (issues) => (targetStatus) =>
  issues.filter(({ status }) => status === targetStatus);

export const JoinIssues = (issues, issueItemTpl) =>
  issues.reduce((prev, curr) => prev + issueItemTpl(curr), ``);
