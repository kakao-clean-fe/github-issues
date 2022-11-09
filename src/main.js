import { getIssueItemTpl, getIssueTpl } from "./tpl";
const DATA_SOURCE_ISSUES = "/data-sources/issues.json";

const suffix = {
  open: "Opens",
  close: "Closed",
};

const pipe = (funcs, value) => funcs.reduce((acc, func) => func(acc), value);
const toFetch = (path, callback = (items) => items) =>
  fetch(path)
    .then((res) => res.json())
    .then(callback);

const parser = new DOMParser();

const findById = (id) => document.getElementById(id);

const toHtml = (text) =>
  parser.parseFromString(text, "text/html").body.firstChild;

const toType = (el) => (el.classList.contains("open-count") ? "open" : "close");

const renderBody = (bodyTemplate) => (target) =>
  pipe([bodyTemplate, toHtml, (html) => target.appendChild(html)]);

const filterStatus = (items) => (status) =>
  items.filter((item) => item.status === status);

const renderData = (target) => (status) => (itemTemplate) => (items) => {
  target.innerText = "";
  filterStatus(items)(status)
    .map(itemTemplate)
    .map(toHtml)
    .forEach((el) => target.appendChild(el));
  return items;
};

const changeStatus = (target) => (items) => (status) => {
  const type = toType(target);
  target.classList.toggle("font-bold", status === type);
  target.innerText = `${filterStatus(items)(type).length} ${suffix[type]}`;
};

const updateStatus = (target) => (status) => (items) => {
  [...target.querySelectorAll("div")].forEach((el) =>
    changeStatus(el)(items)(status)
  );
  return items;
};

const addEventStatus = (body) => {
  const statusTab = body.querySelector(".statusTab");
  [...statusTab.querySelectorAll("div")].forEach((el) => {
    el.addEventListener("click", () => pipe([toType, fetchData], el)(body));
  });
  return body;
};

const fetchData = (status) => (body) => {
  const ul = body.querySelector("ul");
  const statusTab = body.querySelector(".statusTab");

  toFetch(DATA_SOURCE_ISSUES).then((items) =>
    pipe(
      [
        renderData(ul)(status)(getIssueItemTpl),
        updateStatus(statusTab)(status),
      ],
      items
    )
  );
  return body;
};

const render = (status = "open") => {
  pipe(
    [findById, renderBody(getIssueTpl), fetchData(status), addEventStatus],
    "app"
  );
};

render();
