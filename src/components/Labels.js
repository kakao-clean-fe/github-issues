import { renderUtils } from "../utils";
import { MENU, LABEL } from "../constants";
import { inputEvent, clickEvent } from "../event";

class Labels {
  constructor(labels) {
    this.app = document.querySelector("#app");
    this.labelWrapper = app.querySelector(LABEL.WRAPPER);
    this.labels = labels;
    this.bindEvent();
  }

  bindEvent() {
    inputEvent();
    clickEvent();
  }

  render() {
    renderUtils.setItems(this.labelWrapper, this.labels.allLabels, MENU.LABEL);
  }
}

export default Labels;
