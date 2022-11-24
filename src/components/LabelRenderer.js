import { $, MENU, LABEL } from "../constants";
import { renderUtils } from "../utils";
import { inputEvent, clickEvent } from "../event";

class LabelRenderer {
  constructor(labelStore) {
    this.labelStore = labelStore;
    this.render();
    this.bindEvent();
  }

  bindEvent() {
    inputEvent();
    clickEvent(this.labelStore);
  }

  render() {
    this.labelStore.subscribe((label) => {
      const labelWrapper = $(LABEL.WRAPPER);
      const item = { target: labelWrapper, data: label, type: MENU.LABEL };
      renderUtils.setItems(item);
    });
  }
}

export default LabelRenderer;
