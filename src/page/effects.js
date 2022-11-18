import { issueStore$ } from "../store/issue";
import { fetchStoreData } from "../util/feature";

/** fetch and store data */
export const fetchIssues = () => fetchStoreData('../data-sources/issues.json')(issueStore$);
