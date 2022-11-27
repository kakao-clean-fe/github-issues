import {
  CLASS_NEW_LABEL_OPEN_BTN,
  CLASS_UPDATE_LABEL_BTN,
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
  LOCAL_STORE_COLOR,
} from "../constants";
import { getLabelTpl } from "../tpl";
import { getRandomHexColor } from "../utils";
import CreateLabelModel from "./CreateLabelModel";
import CreateLabelView from "./CreateLabelView";
import ListLabelModel from "./ListLabelModel";
import ListLabelView from "./ListLabelView";

const labelsModel = new ListLabelModel();
const createModel = new CreateLabelModel();
const createView = new CreateLabelView({ model: createModel });
const labelsView = new ListLabelView({ model: labelsModel });

const evtNewLabelClick = () => {
  createModel.setIsOpen(!createModel.getIsOpen());
};

const evtColorChangeClick = () => {
  const randomHexColor = getRandomHexColor();
  createModel.setHexColor(randomHexColor);
};

const evtCancelClick = () => {
  createModel.setIsOpen(!createModel.getIsOpen());
};

const evtCreateLabelClick = async (event) => {
  event.preventDefault();
  const labelNameValue = document.querySelector(ID_NEW_LABEL_NAME_INPUT).value;
  const labelColorValue = document.querySelector(
    ID_NEW_LABEL_COLOR_INPUT
  ).value;
  const labelDescValue = document.querySelector(ID_NEW_LABEL_DESC_INPUT).value;
  await labelsModel.addLabelData({
    name: labelNameValue,
    color: labelColorValue.replace("#", ""),
    description: labelDescValue,
  });
};

const evtRefreshLabelsClick = async (event) => {
  event.preventDefault();
  await labelsModel.getDelayInitialData();
};

const saveHexColorInStorage = () => {
  localStorage.setItem(LOCAL_STORE_COLOR, createModel.getHexColor());
  console.log('saved', createModel.getHexColor());
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
  document
    .querySelector(CLASS_UPDATE_LABEL_BTN)
    .addEventListener("click", evtRefreshLabelsClick);
  window.addEventListener("beforeunload", saveHexColorInStorage);
};

export const LabelPageInit = async () => {
  document.querySelector(ID_APP).innerHTML = getLabelTpl();
  addEventHandler();
  await labelsModel.getInitialData();
  labelsView.render();
};
