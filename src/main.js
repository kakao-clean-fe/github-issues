import { renderIssue, renderLabel } from "./page";
import { $, MENU } from "./constants";
import { worker } from "./mocks/browser";
worker.start();

const { ISSUE, LABEL } = MENU;
const renderMenu = async (selectedMenu) => {
  if (selectedMenu === ISSUE) {
    await renderIssue();
  } else if (selectedMenu === LABEL) {
    await renderLabel();
  }
};

$("nav").addEventListener("click", function (e) {
  const option = e.target.innerHTML.toUpperCase();
  renderMenu(MENU[option]);
});

renderMenu(LABEL);
