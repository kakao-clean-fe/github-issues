import {fetchIssues} from "../utils/fetch.js";
import {getIssueTpl} from "../tpl.js";
import {issuesAtom} from "../store/atom.js";
import {initIssueItems} from "../components/Issue/issueItem.js";
import {initIssueStatus} from "../components/Issue/issueStatus.js";
import {useSetAtomListener, useSetAtomValue} from "../store/atomHooks.js";
import {SELECTOR} from "../consts/selector.js";

const setIssues = useSetAtomValue(issuesAtom);
const setIssuesListener = useSetAtomListener(issuesAtom);

export default async () => {
    const issues = (await fetchIssues()).data;
    setIssuesListener(fetchIssueAtomListeners);
    setIssues(issues);
    initIssueLayout();
    initIssueStatus();
    initIssueItems();
}

const initIssueLayout = () => document.querySelector(SELECTOR.ROOT).innerHTML = getIssueTpl();

const fetchIssueAtomListeners = () => console.log("fetchIssueData");