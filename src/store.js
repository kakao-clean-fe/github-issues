const store = () => {
  let issues = [];
  let activatedStatus = ''; // 'open' or 'close'
  const allIssuesWatchers = [];
  const statusWatchers = [];

  return {
    getIssues() {
      return issues;
    },
    setIssues(newValue) {
      issues = newValue;
      allIssuesWatchers.forEach(watcher => watcher());
    },
    getActivatedStatusIssues() {
      return activatedStatus === 'open' ? this.getOpenIssues() : this.getCloseIssues();
    },
    addAllIssuesWatchers(watchers) { // []
      watchers.forEach(watcher => allIssuesWatchers.push(watcher));
    },
    addStatusWatchers(watchers) { // []
      watchers.forEach(watcher => statusWatchers.push(watcher));
    },
    getActivatedStatus() {
      return activatedStatus;
    },
    setActivatedStatus(status) {
      const prev = activatedStatus;

      if (prev === status) {
        return;
      }

      activatedStatus = status;
      statusWatchers.forEach(watcher => watcher(status))
    },
    getOpenIssues() {
      return issues.filter(issue => issue.status === 'open');
    },
    getCloseIssues() {
      return issues.filter(issue => issue.status === 'close');
    }
  }
};

export default store();