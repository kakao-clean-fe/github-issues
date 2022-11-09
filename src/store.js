import {ISSUE_STATUS} from "./const.js";

export const getIssueStatusStore = () => {
    let issueStatus = ISSUE_STATUS.OPEN;
    return {
        getIssueStatus : () => issueStatus,
        setIssueStatus : () => issueStatus = issueStatus === ISSUE_STATUS.OPEN ? ISSUE_STATUS.CLOSE: ISSUE_STATUS.OPEN
    }
}

export const getIssueStore = () => {
    let issues = [];
    return {
        getIssues : () => issues,
        setIssues : (data) => issues = data
    }
}