import { toFetch, updateUI, findByClass, renderLayout } from "./helper";
import LabelCreateUI from "./LabelCreateUI";
import Store from "./Store";
import { getLabelTpl, getLabelItemTpl } from "./tpl";

const DATA_SOURCE_LABEL = "/data-sources/labels.json";

const renderLabelLayout = renderLayout(getLabelTpl);

const initializeLabel = async (target) => {
  target.innerText = "";

  const label = new Store(DATA_SOURCE_LABEL);

  renderLabelLayout(target);

  const find = findByClass(target);

  const listEl = find("label-list");
  const openEl = find("open-count");

  const labelUI = updateUI(getLabelItemTpl, listEl, [openEl], ["Labels"]);

  label.subscribe((store) => labelUI(store, store.items));

  const newLabelButton = find("new-label-button");

  const ui = new LabelCreateUI("new-label-form", label);
  ui.render();

  newLabelButton.addEventListener("click", (e) => {
    e.preventDefault();
    ui.toggle();
  });
};

export default initializeLabel;
