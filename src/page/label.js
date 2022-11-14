import { getLabelTpl } from "../template";
import { getData } from "../api";
import { renderUtils } from "../utils";
import { MENU, LABEL } from "../constants";
import { labelInputEvent, labelClickEvent } from "../event";

export const renderLabel = async () => {
  const labelData = await getData("labels");
  const app = document.querySelector("#app");
  app.innerHTML = getLabelTpl();

  labelInputEvent(app);
  labelClickEvent(app);

  const labelWrapper = app.querySelector(LABEL.WRAPPER);
  renderUtils.setItems(labelWrapper, labelData, MENU.LABEL);
};
