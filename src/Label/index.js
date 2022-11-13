import { CLASS_APP } from "../constants";
import { getLabelTpl } from "../tpl";
import { getRandomHexColor } from "../utils";
import ListLabelModel from "./ListLabelModel";
import ListLabelView from "./ListLabelView";

const labelsModel = new ListLabelModel();

const evtNewLabelClick = () => {
  const labelFormWrapper = document.querySelector("#new-label-form");
  labelFormWrapper.classList.remove("hidden");
};

const evtColorChangeClick = () => {
  const randomHexColor = getRandomHexColor();
  const labelPreview = document.getElementById("label-preview");
  const labelColor = document.getElementById("new-label-color");

  labelPreview.style.backgroundColor = `#${randomHexColor}`;
  labelColor.style.backgroundColor = `#${randomHexColor}`;
  document.getElementById("label-color-input").value = `#${randomHexColor}`;
};

const evtCancelClick = () => {
  const labelFormWrapper = document.querySelector("#new-label-form");
  labelFormWrapper.classList.add("hidden");
}

const evtCreateLabelClick = (event) => {
  event.preventDefault();
  const labelNameValue = document.querySelector("#label-name-input").value;
  const labelColorValue = document.querySelector("#label-color-input").value;
  const labelDescValue = document.querySelector("#label-description-input").value;
  labelsModel.addLabel({name: labelNameValue, color: labelColorValue.replace('#',''), description: labelDescValue});
}

const addEventHandler = () => {
  document
    .querySelector(".new-label-button")
    .addEventListener("click", evtNewLabelClick);
  document
    .querySelector("#new-label-color")
    .addEventListener("click", evtColorChangeClick);
  document
    .querySelector("#label-cancel-button")
    .addEventListener("click", evtCancelClick);
  document
    .querySelector("#label-create-button")
    .addEventListener("click", evtCreateLabelClick);
}

export const LabelPageInit = async () => {
  document.querySelector(CLASS_APP).innerHTML = getLabelTpl();
  addEventHandler();
  await labelsModel.getInitialData();
  const labelsView = new ListLabelView({ model: labelsModel });
}