export const fetchIssueData = async () => await ((await fetch("/issues")).json());

export const fetchLabelData = async () => await ((await fetch("/labels")).json());