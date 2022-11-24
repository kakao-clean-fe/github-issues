import { issueStore$ } from "./issue";
import { fetchStoreData } from "../util/feature";

/** fetch and store data */
export const fetchIssues = () => fetchStoreData(issueStore$)('/issues')();
