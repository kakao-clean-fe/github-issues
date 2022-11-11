import {SELECTOR} from "../../const.js";
import {filterIssueByStatus, getIssueTplStr, pipe} from "../../utils.js";
import {issueStatusStore, issueStore} from "../../store.js";

const {getIssues} = issueStore();
const {getIssueStatus} = issueStatusStore();

export const updateIssueItems = () => pipe(filterIssueByStatus, renderIssueItems)(getIssues(), getIssueStatus());
export const initIssueItems = updateIssueItems;

const renderIssueItems = (issues) => {
    document.querySelector(SELECTOR.ISSUE_LIST).innerHTML = getIssueTplStr(issues);
}