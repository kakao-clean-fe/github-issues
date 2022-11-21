import { MENU } from "../constants";
import { getIssueItemTpl, getLabelItemTpl } from "../template";

const setItems = (item) => {
  const { target, data, type } = item;
  if (!target) return;
  target.innerHTML = "";

  const tplFunction = type === MENU.ISSUE ? getIssueItemTpl : getLabelItemTpl;
  data.forEach((d) => (target.innerHTML += tplFunction(d)));
};

const renderUtils = { setItems };

export { renderUtils };
