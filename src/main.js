import { getIssueItemTpl, getIssueTpl } from "./tpl";

const DATA_SOURCE_ISSUES = "/data-sources/issues.json";

const domParser = new DOMParser();

const pipeStack = (funcs, value) =>
  funcs.reduce((acc, func) => ({ ...acc, ...func(acc) }), { value });

const pipe = (funcs, value) => funcs.reduce((acc, func) => func(acc), value);

const parser = (text) => ({
  target: domParser.parseFromString(text, "text/html").body.firstChild,
});

const toDict =
  (getKey = (item) => !item) =>
  (items = []) =>
    items.reduce((acc, item) => {
      const key = getKey(item);
      return { ...acc, [key]: [...(acc[key] || []), item] };
    }, {});

const toFetch = (path, callback = (items) => items) =>
  fetch(path)
    .then((res) => res.json())
    .then(callback);

const selector = (elementDict = {}, select) => {
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

const renderItems =
  (itemCreator) =>
  (items = []) =>
    items.map((item) => pipe([itemCreator, parser], item).target);

const renderIssueItems =
  (items) =>
  ({ ul, count, value }) =>
    pipeStack(
      [
        (data) => ({ issueData: toIssueData(data.value) }),
        ({ issueData }) => {
          selector(count, value);
          count.open.innerText = `${issueData["open"].length} Opens`;
          count.close.innerText = `${issueData["close"].length} Closed`;
          return {
            issueAppend: appendItems(ul),
            createItems: renderItems(getIssueItemTpl),
          };
        },
        ({ issueData, createItems, issueAppend }) =>
          pipe([createItems, issueAppend], issueData[value]),
      ],
      items
    );

const loadItems = (data) =>
  toFetch(DATA_SOURCE_ISSUES, renderIssueItems).then((callback) =>
    callback(data)
  );

const render = (app) =>
  pipeStack(
    [
      () => pipe([parser], getIssueTpl()),
      ({ target }) => {
        app.appendChild(target);

        return {
          ul: target.querySelector("ul"),
          count: {
            open: target.querySelector(".open-count"),
            close: target.querySelector(".close-count"),
          },
        };
      },
      ({ count, ...data }) => {
        count.open.addEventListener("click", () =>
          loadItems({ ...data, count, value: "open" })
        );
        count.close.addEventListener("click", () =>
          loadItems({ ...data, count, value: "close" })
        );
      },
      loadItems,
    ],
    "open"
  );

render(document.getElementById("app"));
