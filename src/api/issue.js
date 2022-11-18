const IssueApi = {
  async fetchIssues() {
    const res = await fetch('/issues');
    return res.json();
  },
};

export default IssueApi;
