import { getIssueItemTpl } from "../template";

const getIssueWith = (issueData, status) =>
  issueData.filter((d) => d.status === status);

const setIssueItems = (showData) => {
  const target = document.querySelector("ul");
  target.innerHTML = "";
  showData.forEach((data) => (target.innerHTML += getIssueItemTpl(data)));
};

const toggleOpenCloseTab = (issueData, openCloseTab, isOpen) => {
  const [t1, t2] = isOpen ? openCloseTab : [...openCloseTab].reverse();
  t1.classList.add("font-bold");
  t2.classList.remove("font-bold");
  const data = getIssueWith(issueData, isOpen ? "open" : "close");
  setIssueItems(data);
};

const issueUtils = { getIssueWith, setIssueItems, toggleOpenCloseTab };

export { issueUtils };
