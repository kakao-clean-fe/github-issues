import { getIssueTpl, getIssueItemTpl } from "./tpl";
import { GetIssues, JoinIssues } from "./api/issues";

const { opens, closes } = await GetIssues();

const renderIssues = (issues) => {
  const issuesHTML = JoinIssues(issues, getIssueItemTpl);
  document.querySelector(".issue-list ul").innerHTML = issuesHTML;
};

const init = async () => {
  const appHtml = getIssueTpl(opens.length, closes.length);
  document.querySelector("#app").innerHTML = appHtml;

  const toggleIssueBtn = (isOpen) => {
    const opensBtn = document.querySelector(".open-count");
    const closedBtn = document.querySelector(".close-count");

    if (isOpen) {
      opensBtn.classList.add("font-bold");
      closedBtn.classList.remove("font-bold");
    } else {
      opensBtn.classList.remove("font-bold");
      closedBtn.classList.add("font-bold");
    }
  };

  const genHandleToggleBtn = (issues) => (event) => {
    toggleIssueBtn(event.target.hasAttribute("open-btn"));
    renderIssues(issues);
  };

  // 이벤트 핸들러 등록
  document
    .querySelector(".open-count")
    .addEventListener("click", genHandleToggleBtn(opens));
  document
    .querySelector(".close-count")
    .addEventListener("click", genHandleToggleBtn(closes));

  // 초기 view 렌더링
  renderIssues(opens);
};

init();
