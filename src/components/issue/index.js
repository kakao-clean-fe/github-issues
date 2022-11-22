import {IssueHeader} from "./IssueHeader.js";
import {IssueItems} from "./IssueItems.js";
import {ISSUE_SELECTOR} from "../../lib/constants/selector.js";
import {issueStatusStore, issueStore, selectedIssueStore} from "../../stores/issue.js";
import {get} from "../../lib/api.js";
import {ISSUE_STATUS} from "../../lib/constants/common.js";

export const renderIssue = (selector) => {
    getInitialData("/issues")
    issueStatusStore.subscribe((_) => setSelectedIssueStore())
    issueStore.subscribe((_) => setSelectedIssueStore())
    renderIssueComponents(selector)
}

const getInitialData = (url) => {
    get({url}).then(data => {
        issueStatusStore.set(ISSUE_STATUS.OPEN)
        issueStore.set(...data)
        setSelectedIssueStore()
    })
}

const setSelectedIssueStore = () => {
    const selectedIssues = issueStore.get(issueStatusStore.get())
    return selectedIssueStore.set(...selectedIssues)
}

const renderIssueComponents = (selector) => {
    new IssueHeader(selector, issueStore, issueStatusStore).render()
    new IssueItems(ISSUE_SELECTOR.LIST, selectedIssueStore).render()
}