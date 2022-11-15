const getIssueWith = (issueData, status) =>
  issueData.filter((d) => d.status === status);

const issueUtils = { getIssueWith };

export { issueUtils };
