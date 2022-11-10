import { getIssueTpl, getIssueItemTpl } from "./template";
import { getData } from "./api";
import { classUtils, issueUtils } from "./utils";
import { FONT_BOLD } from "./constants";

(async () => {
  const issueData = await getData("issues");
  const opens = issueUtils.getIssueWith(issueData, "open");
  const closed = issueUtils.getIssueWith(issueData, "close");

  const app = document.querySelector("#app");
  app.innerHTML = getIssueTpl(opens.length, closed.length);

  const openCloseMenu = document.querySelector(".statusTab");
  openCloseMenu.addEventListener("click", function (e) {
    classUtils.removeAll(openCloseMenu.childNodes, FONT_BOLD);
    const target = e.target;
    if (
      target.classList.contains("open-count") ||
      target.classList.contains("close-count")
    ) {
      target.classList.add("font-bold");
    }
  });

  issueUtils.setIssueItems(opens);
})();
