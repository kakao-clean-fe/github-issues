import Store from "../lib/Store";
import labelList from "../core/LabelList";
import LabelCreateUI from "../core/LabelCreator";

import { LABEL_CLASS_NAME } from "../constants";

const DATA_SOURCE_LABEL = "/data-sources/labels.json";

const label = new Store(DATA_SOURCE_LABEL);

const initializeLabel = async (target) => {
  labelList.store = label;
  labelList.target = target;

  labelList.render();
  const ui = new LabelCreateUI(LABEL_CLASS_NAME.ADD_FORM, label);

  labelList.updateItems();
  labelList.addEvent(() => ui.toggle());
  label.subscribe(() => labelList.updateItems());
};

export default initializeLabel;
