import {fetchIssueData, filterIssueByStatus, getIssueTplStr, pipe} from "./util.js";
import {getIssueTpl} from "./tpl.js";
import {CSS, ISSUE_STATUS} from "./const.js";
import {getIssueStatusStore, getIssueStore} from "./store.js";

const {getIssues, setIssues} = getIssueStore();
const {getIssueStatus, setIssueStatus} = getIssueStatusStore();

export const initIssueContainer = async () => {
    setIssues(await fetchIssueData());
    renderIssueContainer();
    pipe(filterIssueByStatus, renderIssueItems)(getIssues(), getIssueStatus())
}

const renderIssueContainer = () => {
    const issueContainer = document.createElement('template');
    issueContainer.innerHTML = getIssueTpl();
    initIssueStatus(issueContainer);
    document.querySelector('#app').appendChild(issueContainer.content);
}

const initIssueStatus = (issueContainer) => {
    const issueStatusTabs = [...issueContainer.content.querySelector('.statusTab').children];
    issueStatusTabs.forEach((tab) => {
        const isOpenElem = tab.innerText.includes('Open');
        const cnt = filterIssueByStatus(getIssues(), isOpenElem ? ISSUE_STATUS.OPEN : ISSUE_STATUS.CLOSE).length;
        tab.textContent = `${cnt} ${isOpenElem ? 'Opens' : 'Closed'}`;
        tab.addEventListener('click', onClickIssueStatus(issueStatusTabs));
    });
    changeIssueStatusStyle(issueStatusTabs[0], issueStatusTabs);
}

const onClickIssueStatus = (issueStatusTabs) => ({target}) => {
    setIssueStatus();
    changeIssueStatusStyle(target, issueStatusTabs);
    pipe(filterIssueByStatus, renderIssueItems)(getIssues(), getIssueStatus());
}

const changeIssueStatusStyle = (target, issueStatusTabs) => {
    target.classList.add(CSS.FONT_BOLD);
    issueStatusTabs.filter((tab) => tab !== target)[0].classList.remove(CSS.FONT_BOLD);
}

const renderIssueItems = (issues) => {
    document.querySelector('.issue-list ul').innerHTML = getIssueTplStr(issues);
}