export const IssuesData = () => {
  let issues = null;
  return {
    getIssues() {
      return issues;
    },
    setIssues(_issues) {
      issues = _issues;
    },
  };
}
