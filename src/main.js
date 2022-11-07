import { getIssueItemTpl, getIssueTpl } from "./tpl";

const domParser = new DOMParser();

const parser = (text) =>
  domParser.parseFromString(text, "text/html").body.firstChild;

const toDict =
  (getKey = (item) => !item) =>
  (items = []) =>
    items.reduce((acc, item) => {
      const key = getKey(item);
      return { ...acc, [key]: [...(acc[key] || []), item] };
    }, {});

const toFetch = (path) => fetch(path).then((res) => res.json());

const renderItems =
  (itemCreator) =>
  (items = []) =>
    items.map((item) => parser(itemCreator(item)));

const selectElement =
  (elementDict = {}) =>
  (select) => {
    Object.values(elementDict).forEach((element) =>
      element.classList.remove("font-bold")
    );
    elementDict[select].classList.add("font-bold");
  };

const toIssueData = toDict((item) => item.status);

const appendItems = (target) => (items) => {
  target.innerText = "";
  items.forEach((item) => target.appendChild(item));
};

const renderIssue = (target) => {
  target.appendChild(parser(getIssueTpl()));

  const ul = target.querySelector("ul");
  const count = {
    open: target.querySelector(".open-count"),
    close: target.querySelector(".close-count"),
  };

  const selector = selectElement(count);
  const issueAppend = appendItems(ul);
  const createItems = renderItems(getIssueItemTpl);

  const changeStatus = (status) =>
    toFetch("/data-sources/issues.json")
      .then(toIssueData)
      .then((issueData) => {
        selector(status);
        count.open.innerText = `${issueData["open"].length} Opens`;
        count.close.innerText = `${issueData["close"].length} Closed`;
        return issueAppend(createItems(issueData[status]));
      });

  count.open.addEventListener("click", () => changeStatus("open"));
  count.close.addEventListener("click", () => changeStatus("close"));

  return changeStatus;
};

const app = document.getElementById("app");
const issue = renderIssue(app);
issue("open");
