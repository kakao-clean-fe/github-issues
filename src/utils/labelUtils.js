import { $, $$, LABEL } from "../constants";

const uselabelBtn = () => {
  const createLabelBtn = $(`#${LABEL.CREATE_BTN}`);
  createLabelBtn.disabled = false;
  createLabelBtn.classList.remove("opacity-50");
};

const disableLabelBtn = () => {
  const createLabelBtn = $(`#${LABEL.CREATE_BTN}`);
  createLabelBtn.disabled = true;
  createLabelBtn.classList.add("opacity-50");
};

const checkInput = () => {
  let cond = true;
  $$("dl.form-group.my-2 input").forEach((target) => {
    cond = cond && !!target.value;
  });
  return cond;
};

const rancomColor = () => Math.floor(Math.random() * 16777215).toString(16);

const labelUtils = {
  uselabelBtn,
  disableLabelBtn,
  checkInput,
  rancomColor,
};

export { labelUtils };
