import Store from "../lib/Store";
import LabelList from "../core/LabelList";
import LabelCreateUI from "../core/LabelCreator";

import { LABEL_CLASS_NAME } from "../constants";

const DATA_SOURCE_LABEL = "/data-sources/labels.json";

const label = new Store(DATA_SOURCE_LABEL);

const initializeLabel = async (target) => {
  const listUI = new LabelList(label, target, () => {
    const itemUI = new LabelCreateUI(LABEL_CLASS_NAME.ADD_FORM, label);
    listUI.addEvent(() => itemUI.toggle());
  });
  listUI.updateItems();
  label.subscribe(() => listUI.updateItems());
};

export default initializeLabel;
