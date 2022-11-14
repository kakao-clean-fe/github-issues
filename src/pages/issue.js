import {fetchIssueData} from "../utils/fetch.js";
import {getIssueTpl} from "../tpl.js";
import {SELECTOR} from "../const.js";
import {issuesAtom} from "../store/atom.js";
import {initIssueItems} from "../components/Issue/issueItem.js";
import {initIssueStatus} from "../components/Issue/issueStatus.js";
import {useSetAtomListener, useSetAtomValue} from "../store/atomHooks.js";

const setIssues = useSetAtomValue(issuesAtom);
const setIssuesListener = useSetAtomListener(issuesAtom);

export default async () => {
    setIssuesListener(fetchIssueAtomListeners);
    setIssues(await fetchIssueData());
    initIssueLayout();
    initIssueStatus();
    initIssueItems();
}

const initIssueLayout = () => document.querySelector(SELECTOR.ROOT).innerHTML = getIssueTpl();

const fetchIssueAtomListeners = () => console.log("fetchIssueData");