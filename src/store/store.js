const state = {
  _labels: [],
  _issues: []
};

export const store = {
    // actions
    getLabels () {
        return state._labels;
    },

    setLables (labels) {
        state._labels = labels;
    },

    getIssues () {
        return state._issues;
    },

    setIssues (issues) {
        state._issues = issues;
    }
}