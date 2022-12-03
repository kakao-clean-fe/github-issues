import Store from "../lib/Store";
import LabelList from "../core/LabelList";

import { CLASS_NAME } from "../constants";
import { toFetch } from "../utils/helper";

const DATA_SOURCE_LABEL = "/labels";

const initializeLabel = async (target) => {
  const items = await toFetch(DATA_SOURCE_LABEL);
  const label = new Store({ id: "labelData", defaultValue: items });

  const useLabelCreator = () =>
    import("../core/LabelCreator")
      .then((module) => module.default)
      .then((LabelCreateUI) => {
        const itemUI = new LabelCreateUI(CLASS_NAME["label"].ADD_FORM, label);
        listUI.addNewLabelBtnEvent(() => itemUI.toggle());
        itemUI.toggle();
        return itemUI;
      })
      .then((itemUI) => (name, color, description) => {
        const prev = { name, color: `#${color}`, description };
        itemUI.saveData({ ...prev, prev });
      })
      .catch((err) => {
        alert(err);
        console.error(err);
      });

  const listUI = new LabelList(label, target, useLabelCreator);

  listUI.updateItems();
  label.subscribe(() => listUI.updateItems());
};

export default initializeLabel;
