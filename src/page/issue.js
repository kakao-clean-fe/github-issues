import { getIssueTpl } from "../template";
import { getData } from "../api";
import { classUtils, issueUtils, renderUtils } from "../utils";
import { MENU, COMMON, ISSUE_STATUS, ISSUE_CLASS } from "../constants";

export const renderIssue = async () => {
  const issueData = await getData("issues");
  const opens = issueUtils.getIssueWith(issueData, ISSUE_STATUS.OPEN);
  const closed = issueUtils.getIssueWith(issueData, ISSUE_STATUS.CLOSE);

  const app = document.querySelector("#app");
  app.innerHTML = getIssueTpl(opens.length, closed.length);

  const openCloseMenu = document.querySelector(ISSUE_CLASS.STATUS_TAB);
  openCloseMenu.addEventListener("click", function (e) {
    classUtils.removeAll(openCloseMenu.childNodes, COMMON.FONT_BOLD);
    const target = e.target;
    if (
      target.classList.contains(ISSUE_CLASS.OPEN_COUNT) ||
      target.classList.contains(ISSUE_CLASS.CLOSE_COUNT)
    ) {
      target.classList.add(COMMON.FONT_BOLD);
    }
  });

  const target = document.querySelector("ul");
  renderUtils.setItems(target, opens, MENU.ISSUE);
};
