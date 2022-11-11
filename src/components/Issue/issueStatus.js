import {filterIssueByStatus} from "../../utils.js";
import {CSS, ISSUE_STATUS} from "../../const.js";
import {updateIssueItems} from "./issueItem.js";
import {issueStatusStore, issueStore} from "../../store.js";

const {getIssues} = issueStore();
const {setIssueStatus} = issueStatusStore();

export const initIssueStatus = () => {
    const issueStatusTabs = [...document.querySelector('.statusTab').children];
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
    updateIssueItems();
}

const changeIssueStatusStyle = (target, issueStatusTabs) => {
    target.classList.add(CSS.FONT_BOLD);
    issueStatusTabs.filter((tab) => tab !== target)[0].classList.remove(CSS.FONT_BOLD);
}