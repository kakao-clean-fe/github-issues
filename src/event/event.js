import { classUtils, labelUtils, renderUtils } from "../utils";
import { MENU, COMMON, LABEL, LABEL_CLASS } from "../constants";
import Label from "../components/Label";

const app = document.querySelector("#app");

export const inputEvent = () =>
  app.addEventListener("input", (e) => {
    const target = e.target;
    const targetInput = LABEL_CLASS.INPUT.every((className) =>
      target.closest("dl").classList.contains(className)
    );
    if (targetInput && labelUtils.checkInput()) {
      labelUtils.uselabelBtn();
    }
  });

export const clickEvent = () =>
  app.addEventListener("click", (e) => {
    const target = e.target;
    if (
      target.classList.contains(LABEL.NEW_BTN) ||
      target.parentNode.classList.contains(LABEL.NEW_BTN)
    ) {
      classUtils.remove(app.querySelector(LABEL.NEW_FORM), COMMON.HIDDEN);
    } else if (target.id === LABEL.NEW_COLOR) {
      const color = labelUtils.rancomColor();
      app.querySelector(LABEL.COLOR_VALUE).value = color;
      app.querySelector(
        LABEL.COLOR_PREVIEW
      ).style.backgroundColor = `#${color}`;
      target.style.backgroundColor = `#${color}`;
      labelUtils.checkInput() && labelUtils.uselabelBtn();
    } else if (target.id === LABEL.CREATE_BTN) {
      const label = new Label();
      app.querySelectorAll("dl.form-group.my-2 input").forEach((target) => {
        label[target.id.split("-")[1]] = target.value;
      });
      const newLabelData = [JSON.parse(JSON.stringify(label))];
      const labelWrapper = app.querySelector(LABEL.WRAPPER);
      renderUtils.setItems(labelWrapper, newLabelData, MENU.LABEL);
    }
  });
