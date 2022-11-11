import {fetchIssueData} from "../utils.js";
import {getIssueTpl} from "../tpl.js";
import {SELECTOR} from "../const.js";
import {issueStore} from "../store.js";
import {initIssueItems} from "../components/Issue/issueItem.js";
import {initIssueStatus} from "../components/Issue/issueStatus.js";

const {setIssues} = issueStore();

export const initIssuePage = async () => {
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

await initIssuePage();