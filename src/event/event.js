import { classUtils, labelUtils } from "../utils";
import { $, $$, COMMON, LABEL, LABEL_CLASS } from "../constants";
import Label from "../components/Label";

let controller = null;

window.onbeforeunload = (e) => {
  var e = e || window.event;
  localStorage.setItem(LABEL.KEY, JSON.stringify(getNewLabelData()));
  // return "Leaving the page";
};

export const inputEvent = () =>
  $("#app").addEventListener("input", (e) => {
    const target = e.target;
    const targetInput = LABEL_CLASS.INPUT.every((className) =>
      target.closest("dl").classList.contains(className)
    );
    if (targetInput && labelUtils.checkInput()) {
      labelUtils.uselabelBtn();
    }
  });

export const clickEvent = (labelStore) =>
  $("#app").addEventListener("click", (e) => {
    const target = e.target;
    if (
      target.classList.contains(LABEL.NEW_BTN) ||
      target.parentNode.classList.contains(LABEL.NEW_BTN)
    ) {
      loadStorageData();
      showLabel();
    } else if (target.id === LABEL.NEW_COLOR) {
      renderColor(target);
    } else if (target.id === LABEL.CREATE_BTN) {
      createLabel(labelStore);
    } else if (target.id === LABEL.CANCEL_BTN) {
      clear();
    } else if (target.classList.contains(LABEL.REFRESH_BTN)) {
      if (controller) {
        controller.abort();
      }
      updateLabels();
    }
  });

const loadStorageData = () => {
  const storedData = localStorage.getItem(LABEL.KEY)
    ? JSON.parse(localStorage.getItem(LABEL.KEY))
    : {};
  if (Object.keys(storedData).length > 0) {
    $$(LABEL.NEW_INPUT).forEach((target) => {
      const key = target.id.split("-")[1];
      target.value = storedData[key];
    });
    if (storedData.color) {
      $(LABEL.COLOR_PREVIEW).style.backgroundColor = storedData.color;
      $(`#${LABEL.NEW_COLOR}`).style.backgroundColor = storedData.color;
    }
  }
};
const showLabel = () => classUtils.remove($(LABEL.NEW_FORM), COMMON.HIDDEN);

const renderColor = (target) => {
  const color = `#${labelUtils.rancomColor()}`;
  $(LABEL.COLOR_VALUE).value = color;
  $(LABEL.COLOR_PREVIEW).style.backgroundColor = color;
  target.style.backgroundColor = color;
  labelUtils.checkInput() && labelUtils.uselabelBtn();
};

const createLabel = (labelStore) => {
  const label = new Label(getNewLabelData());
  labelStore.add(label.get());
  clear();
};

const getNewLabelData = () => {
  const newLabel = {};
  $$(LABEL.NEW_INPUT).forEach((target) => {
    newLabel[target.id.split("-")[1]] = target.value;
  });
  return newLabel;
};

const updateLabels = () => {
  controller = new AbortController();
  fetch("/labels-delay", { signal: controller.signal })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => {
      if (err.name === "AbortError") {
        console.error("AbortError");
        return;
      }
      throw err;
    });
};

const clear = () => {
  $$(LABEL.NEW_INPUT).forEach((target) => {
    target.value = "";
  });
  labelUtils.disableLabelBtn();
};
