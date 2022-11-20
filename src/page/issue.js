import { getIssueTpl } from "../template";
import { getData } from "../api";
import { classUtils, issueUtils, renderUtils } from "../utils";
import { $, MENU, COMMON, ISSUE_STATUS, ISSUE_CLASS } from "../constants";

export const renderIssue = async () => {
  const issueData = await getData("issues");
  const opens = issueUtils.getIssueWith(issueData, ISSUE_STATUS.OPEN);
  const closed = issueUtils.getIssueWith(issueData, ISSUE_STATUS.CLOSE);

  const app = $("#app");
  app.innerHTML = getIssueTpl(opens.length, closed.length);

  const ulTarget = $("ul");

  const openCloseMenu = $(ISSUE_CLASS.STATUS_TAB);
  openCloseMenu.addEventListener("click", function (e) {
    classUtils.removeAll(openCloseMenu.childNodes, COMMON.FONT_BOLD);
    const target = e.target;
    const isOpen = target.classList.contains(ISSUE_CLASS.OPEN_COUNT);
    if (
      target.classList.contains(ISSUE_CLASS.OPEN_COUNT) ||
      target.classList.contains(ISSUE_CLASS.CLOSE_COUNT)
    ) {
      target.classList.add(COMMON.FONT_BOLD);
      renderUtils.setItems(ulTarget, isOpen ? opens : closed, MENU.ISSUE);
    }
  });

  renderUtils.setItems(ulTarget, opens, MENU.ISSUE);
};
