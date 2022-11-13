import {
  CLASS_NEW_LABEL_OPEN_BTN,
  ID_APP,
  ID_LABEL_PREVIEW,
  ID_NEW_LABEL_CANCEL_BTN,
  ID_NEW_LABEL_COLOR,
  ID_NEW_LABEL_COLOR_INPUT,
  ID_NEW_LABEL_CREATE_BTN,
  ID_NEW_LABEL_DESC_INPUT,
  ID_NEW_LABEL_FORM,
  ID_NEW_LABEL_NAME_INPUT,
  KEY_HIDDEN,
} from "../constants";
import { getLabelTpl } from "../tpl";
import { getRandomHexColor } from "../utils";
import ListLabelModel from "./ListLabelModel";
import ListLabelView from "./ListLabelView";

const labelsModel = new ListLabelModel();

const evtNewLabelClick = () => {
  const labelFormWrapper = document.querySelector(ID_NEW_LABEL_FORM);
  labelFormWrapper.classList.remove(KEY_HIDDEN);
};

const evtColorChangeClick = () => {
  const randomHexColor = getRandomHexColor();
  const labelPreview = document.querySelector(ID_LABEL_PREVIEW);
  const labelColor = document.querySelector(ID_NEW_LABEL_COLOR);
  const labelColorInput = document.querySelector(ID_NEW_LABEL_COLOR_INPUT);

  labelPreview.style.backgroundColor = `#${randomHexColor}`;
  labelColor.style.backgroundColor = `#${randomHexColor}`;
  labelColorInput.value = `#${randomHexColor}`;
};

const evtCancelClick = () => {
  const labelFormWrapper = document.querySelector(ID_NEW_LABEL_FORM);
  labelFormWrapper.classList.add(KEY_HIDDEN);
};

const evtCreateLabelClick = (event) => {
  event.preventDefault();
  const labelNameValue = document.querySelector(ID_NEW_LABEL_NAME_INPUT).value;
  const labelColorValue = document.querySelector(
    ID_NEW_LABEL_COLOR_INPUT
  ).value;
  const labelDescValue = document.querySelector(ID_NEW_LABEL_DESC_INPUT).value;
  labelsModel.addLabel({
    name: labelNameValue,
    color: labelColorValue.replace("#", ""),
    description: labelDescValue,
  });
};

const addEventHandler = () => {
  document
    .querySelector(CLASS_NEW_LABEL_OPEN_BTN)
    .addEventListener("click", evtNewLabelClick);
  document
    .querySelector(ID_NEW_LABEL_COLOR)
    .addEventListener("click", evtColorChangeClick);
  document
    .querySelector(ID_NEW_LABEL_CANCEL_BTN)
    .addEventListener("click", evtCancelClick);
  document
    .querySelector(ID_NEW_LABEL_CREATE_BTN)
    .addEventListener("click", evtCreateLabelClick);
};

export const LabelPageInit = async () => {
  document.querySelector(ID_APP).innerHTML = getLabelTpl();
  addEventHandler();
  await labelsModel.getInitialData();
  const labelsView = new ListLabelView({ model: labelsModel });
  labelsView.render();
};
