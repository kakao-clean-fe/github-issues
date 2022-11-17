const IssueApi = {
  async fetchIssues() {
    const res = await fetch('../../data-sources/issues.json');
    return res.json();
  },
};

export default IssueApi;
