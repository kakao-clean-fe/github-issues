import * as template from "./tpl"

const STATUS = {
    OPEN: "open",
    CLOSE: "close"
}

const app = document.querySelector("#app");
app.innerHTML = template.getIssueTpl();

const fetchData = async (fileName) => {
    const result = await fetch(`../data-sources/${fileName}.json`);
    return await result.json();
};

const issues = await fetchData("issues");

const issueList = document.querySelector(".issue-list ul")

function setIssueItemTpl(status) {
    issueList.innerHTML = "";

    filteredIssues(status)
        .map(issue => template.getIssueItemTpl(issue))
        .forEach(item => issueList.innerHTML += item)
};

const openCount = document.querySelector(".statusTab .open-count");
const closeCount = document.querySelector(".statusTab .close-count");

openCount.addEventListener("click", function () {
    closeCount.classList.remove("font-bold");
    openCount.classList.add("font-bold");
    setIssueItemTpl(STATUS.OPEN);
})

closeCount.addEventListener("click", function () {
    openCount.classList.remove("font-bold");
    closeCount.classList.add("font-bold");
    setIssueItemTpl(STATUS.CLOSE);
})

function filteredIssues(status) {
    return issues.filter(issue => issue.status == status);
}

export function renderIssues() {
    setIssueItemTpl("open");
    openCount.innerHTML = `${filteredIssues(STATUS.OPEN).length} Opened`
    closeCount.innerHTML = `${filteredIssues(STATUS.CLOSE).length} Closed`
};
