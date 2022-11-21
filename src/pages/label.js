import Store from "../lib/Store";
import LabelList from "../core/LabelList";

import { CLASS_NAME } from "../constants";
import { toFetch } from "../utils/helper";

const DATA_SOURCE_LABEL = "/labels";

const initializeLabel = async (target) => {
  const items = await toFetch(DATA_SOURCE_LABEL);
  const label = new Store(items);

  const listUI = new LabelList(label, target, () => {
    import("../core/LabelCreator")
      .then((module) => module.default)
      .then((LabelCreateUI) => {
        const itemUI = new LabelCreateUI(CLASS_NAME["label"].ADD_FORM, label);
        listUI.addEvent(() => itemUI.toggle());
        itemUI.toggle();
      })
      .catch((err) => {
        alert(err);
      });
  });

  listUI.updateItems();
  label.subscribe(() => listUI.updateItems());
};

export default initializeLabel;
