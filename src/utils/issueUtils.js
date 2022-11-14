import { getIssueItemTpl } from "../template";
import { renderUtils } from "../utils";
import { COMMON, MENU, ISSUE_STATUS } from "../constants";

const getIssueWith = (issueData, status) =>
  issueData.filter((d) => d.status === status);

const setIssueItems = (showData) => {
  const target = document.querySelector("ul");
  target.innerHTML = "";
  showData.forEach((data) => (target.innerHTML += getIssueItemTpl(data)));
};

const toggleOpenCloseTab = (issueData, openCloseTab, isOpen) => {
  const [t1, t2] = isOpen ? openCloseTab : [...openCloseTab].reverse();
  t1.classList.add(COMMON.FONT_BOLD);
  t2.classList.remove(COMMON.FONT_BOLD);
  const data = getIssueWith(
    issueData,
    isOpen ? ISSUE_STATUS.OPEN : ISSUE_STATUS.CLOSE
  );
  const target = document.querySelector("ul");
  renderUtils.setItems(target, data, MENU.ISSUE);
};

const issueUtils = { getIssueWith, setIssueItems, toggleOpenCloseTab };

export { issueUtils };
