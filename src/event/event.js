import { classUtils, labelUtils } from "../utils";
import { $, $$, COMMON, LABEL, LABEL_CLASS } from "../constants";
import Label from "../components/Label";

const app = $("#app");

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

export const clickEvent = (labelStore) =>
  app.addEventListener("click", (e) => {
    const target = e.target;
    if (
      target.classList.contains(LABEL.NEW_BTN) ||
      target.parentNode.classList.contains(LABEL.NEW_BTN)
    ) {
      showLabel();
    } else if (target.id === LABEL.NEW_COLOR) {
      renderColor(target);
    } else if (target.id === LABEL.CREATE_BTN) {
      createLabel(labelStore);
    }
  });

const showLabel = () => classUtils.remove($(LABEL.NEW_FORM), COMMON.HIDDEN);

const renderColor = (target) => {
  const color = labelUtils.rancomColor();
  $(LABEL.COLOR_VALUE).value = color;
  $(LABEL.COLOR_PREVIEW).style.backgroundColor = `#${color}`;
  target.style.backgroundColor = `#${color}`;
  labelUtils.checkInput() && labelUtils.uselabelBtn();
};

const createLabel = (labelStore) => {
  const label = new Label(getNewLabelData());
  labelStore.add(label.get());
};

const getNewLabelData = () => {
  const newLabel = {};
  $$(LABEL.NEW_INPUT).forEach((target) => {
    newLabel[target.id.split("-")[1]] = target.value;
  });
  return newLabel;
};
