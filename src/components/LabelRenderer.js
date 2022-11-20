import Labels from "../store/labels";
import { $, MENU, LABEL } from "../constants";
import { renderUtils } from "../utils";

class LabelRenderer {
  constructor(labelStore) {
    this.labelStore = labelStore;
    this.render();
  }

  getStore() {
    return this.labelStore;
  }

  render() {
    this.labelStore.subscribe((label) => {
      const labelWrapper = $(LABEL.WRAPPER);
      renderUtils.setItems(labelWrapper, label, MENU.LABEL);
    });
  }
}

export default LabelRenderer;
// export default new LabelRenderer(new Labels());
