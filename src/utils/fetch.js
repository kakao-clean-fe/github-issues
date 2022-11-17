export const fetchIssueData = async () => await ((await fetch("../data-sources/issues.json")).json());

export const fetchLabelData = async () => await ((await fetch("../data-sources/labels.json")).json());