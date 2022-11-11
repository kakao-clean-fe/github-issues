import {SELECTOR} from "../../const.js";
import {filterIssueByStatus, getIssueTplStr, pipe} from "../../utils.js";
import {issuesAtom, issueStatusAtom} from "../../store/atom.js";
import {useAtomValue} from "../../store/atomHooks.js";

const getIssues = useAtomValue(issuesAtom);
const getIssueStatus = useAtomValue(issueStatusAtom);

export const updateIssueItems = () => pipe(filterIssueByStatus, renderIssueItems)(getIssues(), getIssueStatus());
export const initIssueItems = updateIssueItems;

const renderIssueItems = (issues) => {
    document.querySelector(SELECTOR.ISSUE_LIST).innerHTML = getIssueTplStr(issues);
}