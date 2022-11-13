import { toFetch, updateUI, findByClass, renderLayout } from "./helper";
import { getLabelTpl, getLabelItemTpl } from "./tpl";

const DATA_SOURCE_LABEL = "/data-sources/labels.json";

const renderLabelLayout = renderLayout(getLabelTpl);

const updateLabelItems = async () => ({
  open: await toFetch(DATA_SOURCE_LABEL),
});

const initializeLabel = async (target) => {
  target.innerText = "";

  renderLabelLayout(target);

  const find = findByClass(target);

  const listEl = find("label-list");
  const openEl = find("open-count");

  const labelUI = updateUI(getLabelItemTpl, listEl, [openEl], ["Labels"]);

  const data = await updateLabelItems(target.querySelector("ul"), "open");
  labelUI(data["open"], data.open);
};

export default initializeLabel;
