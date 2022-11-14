import { ISSUES_URL, LABELS_URL } from '../constants/api';

export const fetchData = (url) => fetch(url).then(res => res.json());

export const fetchIssuesData = async () => fetchData(ISSUES_URL);

export const fetchLabels = async () => fetchData(LABELS_URL);