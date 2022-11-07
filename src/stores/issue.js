export const IssuesData = () => {
  let issues = null;
  return {
    getIssues: function () {
      return issues;
    },
    setIssues: function (_issues) {
      issues = _issues;
    },
  };
}