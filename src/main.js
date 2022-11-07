import { getIssueTpl, getIssueItemTpl } from "./template";
import { getData } from "./api";
import { issueUtils } from "./utils";

const issueData = await getData("issues");
const opens = issueUtils.getIssueWith(issueData, "open");
const closed = issueUtils.getIssueWith(issueData, "close");

const app = document.querySelector("#app");
app.innerHTML = getIssueTpl(opens.length, closed.length);

const openCloseTab = [
  document.querySelector(".open-count"),
  document.querySelector(".close-count"),
];
openCloseTab.forEach((tab, idx) => {
  tab.addEventListener("click", () => {
    issueUtils.toggleOpenCloseTab(issueData, openCloseTab, idx === 0);
  });
});

issueUtils.setIssueItems(opens);
