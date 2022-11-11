import {fetchIssueData} from "../utils/fetch.js";
import {getIssueTpl} from "../tpl.js";
import {SELECTOR} from "../const.js";
import {issuesAtom} from "../store/atom.js";
import {initIssueItems} from "../components/Issue/issueItem.js";
import {initIssueStatus} from "../components/Issue/issueStatus.js";
import {useSetAtomListener, useSetAtomValue} from "../store/atomHooks.js";

const setIssues = useSetAtomValue(issuesAtom);
const setIssuesListener = useSetAtomListener(issuesAtom);

export const initIssuePage = async () => {
    setIssuesListener(fetchIssueAtomListeners);
    setIssues(await fetchIssueData());
    initIssueLayout();
    initIssueStatus();
    initIssueItems();
}

const initIssueLayout = () => {
    const issueContainer = document.createElement('template');
    issueContainer.innerHTML = getIssueTpl();
    document.querySelector(SELECTOR.ROOT).appendChild(issueContainer.content);
}

export const fetchIssueAtomListeners = () => console.log("fetchIssueData");

await initIssuePage();