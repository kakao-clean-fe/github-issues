import { getIssueTpl, getIssueItemTpl } from "./template";
import { getData } from "./api";
import { issueUtils } from "./utils";

const issueData = await getData("issues");
const opens = issueUtils.getIssueWith(issueData, "open").length;
const closed = issueUtils.getIssueWith(issueData, "close").length;

const app = document.querySelector("#app");
app.innerHTML = getIssueTpl(opens, closed);

const openCloseTab = [
  document.querySelector(".open-count"),
  document.querySelector(".close-count"),
];
openCloseTab.forEach((tab, idx) => {
  tab.addEventListener("click", () =>
    issueUtils.toggleOpenCloseTab(openCloseTab, idx === 0)
  );
});

issueUtils.setIssueItems(issueData);
