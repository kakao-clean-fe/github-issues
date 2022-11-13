import {
  pipe,
  filter,
  toFetch,
  toggleUI,
  updateUI,
  findByClass,
  renderLayout,
} from "./helper";
import { getIssueTpl, getIssueItemTpl } from "./tpl";

const DATA_SOURCE_ISSUES = "/data-sources/issues.json";

const renderIssueLayout = renderLayout(getIssueTpl);

const getIssueItems = (status) => filter((item) => item.status === status);

const toggleFontBold = toggleUI("font-bold");

const updateIssueItems = async () => {
  const filterOpenIssue = getIssueItems("open");
  const filterCloseIssue = getIssueItems("close");

  const items = await toFetch(DATA_SOURCE_ISSUES);

  return { open: filterOpenIssue(items), close: filterCloseIssue(items) };
};

const initializeIssue = async (target) => {
  target.innerText = "";

  renderIssueLayout(target);

  const find = findByClass(target);

  const openEl = find("open-count");
  const closeEl = find("close-count");
  const listEl = find("issue-list ul");

  const issuesUI = updateUI(
    getIssueItemTpl,
    listEl,
    [openEl, closeEl],
    ["Opens", "Closed"]
  );

  const handleToggle = (type) => async () => {
    const data = await updateIssueItems(target.querySelector("ul"), type);
    issuesUI(data[type], data.open, data.close);
  };

  const loadOpenIssue = () =>
    pipe(toggleFontBold, handleToggle("open"))([openEl, closeEl]);
  const loadCloseIssue = () =>
    pipe(toggleFontBold, handleToggle("close"))([closeEl, openEl]);

  openEl.addEventListener("click", loadOpenIssue);
  closeEl.addEventListener("click", loadCloseIssue);

  loadOpenIssue();
};

export default initializeIssue;
