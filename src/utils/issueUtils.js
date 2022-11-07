import { getIssueItemTpl } from "../template";

const getIssueWith = (data, status) => {
  return data.filter((d) => d.status === status);
};

const setIssueItems = (showData) => {
  const target = document.querySelector("ul");
  target.innerHTML = "";
  showData.forEach((data) => (target.innerHTML += getIssueItemTpl(data)));
};

const toggleOpenCloseTab = (openCloseTab, isOpen) => {
  const [t1, t2] = isOpen ? openCloseTab : openCloseTab.reverse();
  t1.classList.add("font-bold");
  t2.classList.remove("font-bold");
  setIssueItems(getIssueWith(issueData, isOpen ? "open" : "close"));
};

const issueUtils = { getIssueWith, setIssueItems, toggleOpenCloseTab };

export { issueUtils };
