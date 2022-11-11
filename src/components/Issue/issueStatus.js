import {filterIssueByStatus} from "../../utils.js";
import {CSS, ISSUE_STATUS} from "../../const.js";
import {updateIssueItems} from "./issueItem.js";
import {issuesAtom, issueStatusAtom} from "../../store/atom.js";
import {useAtom, useAtomValue, useSetAtomListener} from "../../store/atomHooks.js";

const getIssues = useAtomValue(issuesAtom);
const [getIssueStatus, setIssueStatus] = useAtom(issueStatusAtom);
const setIssueStatusListener = useSetAtomListener(issueStatusAtom)

export const initIssueStatus = () => {
    const issueStatusTabs = [...document.querySelector('.statusTab').children];
    issueStatusTabs.forEach((tab) => {
        const isOpenElem = tab.innerText.includes('Open');
        const cnt = filterIssueByStatus(getIssues(), isOpenElem ? ISSUE_STATUS.OPEN : ISSUE_STATUS.CLOSE).length;
        tab.textContent = `${cnt} ${isOpenElem ? 'Opens' : 'Closed'}`;
        tab.addEventListener('click', onClickIssueStatus(issueStatusTabs));
        setIssueStatusListener(onClickAtomListener);
    });
    changeIssueStatusStyle(issueStatusTabs[0], issueStatusTabs);
}

const onClickIssueStatus = (issueStatusTabs) => ({target}) => {
    setIssueStatus(getIssueStatus() === ISSUE_STATUS.OPEN ? ISSUE_STATUS.CLOSE : ISSUE_STATUS.OPEN);
    changeIssueStatusStyle(target, issueStatusTabs);
    updateIssueItems();
}

export const onClickAtomListener = () => console.log("onClickIssueStatus");

const changeIssueStatusStyle = (target, issueStatusTabs) => {
    target.classList.add(CSS.FONT_BOLD);
    issueStatusTabs.filter((tab) => tab !== target)[0].classList.remove(CSS.FONT_BOLD);
}