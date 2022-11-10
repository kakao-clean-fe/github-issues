import { getIssueTpl, getIssueItemTpl } from "./template";
import { getData } from "./api";
import { issueUtils } from "./utils";

(async () => {
  const issueData = await getData("issues");
  const opens = issueUtils.getIssueWith(issueData, "open");
  const closed = issueUtils.getIssueWith(issueData, "close");

  const app = document.querySelector("#app");
  app.innerHTML = getIssueTpl(opens.length, closed.length);

  const removeAllClass = (paths, className) =>
    paths.forEach((path) => path.classList?.remove(className));

  const openCloseMenu = document.querySelector(".statusTab");

  openCloseMenu.addEventListener("click", function (e) {
    removeAllClass(openCloseMenu.childNodes, "font-bold");
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
