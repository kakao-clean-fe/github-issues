import { MENU } from "../constants";
import { getIssueItemTpl, getLabelItemTpl } from "../template";

const setItems = (target, showData, type) => {
  if (type === MENU.ISSUE) {
    target.innerHTML = "";
  }
  const tplFunction = type === MENU.ISSUE ? getIssueItemTpl : getLabelItemTpl;
  showData.forEach((data) => (target.innerHTML += tplFunction(data)));
};

const renderUtils = { setItems };

export { renderUtils };
