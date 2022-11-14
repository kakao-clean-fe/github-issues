import { rancomColor, checkInput, uselabelBtn, renderUtils } from "../utils";
import { MENU } from "../constants";

class Label {
  constructor() {
    this.name = "";
    this.description = "";
    this.color = "000000";
  }
}

export const labelInputEvent = (app) =>
  app.addEventListener("input", (e) => {
    const target = e.target;
    const inputClass = ["form-group", "my-2"];
    const targetInput = inputClass.every((className) =>
      target.closest("dl").classList.contains(className)
    );
    if (targetInput && checkInput()) {
      uselabelBtn();
    }
  });

export const labelClickEvent = (app) =>
  app.addEventListener("click", (e) => {
    const target = e.target;
    if (
      target.classList.contains("new-label-button") ||
      target.parentNode.classList.contains("new-label-button")
    ) {
      app.querySelector("#new-label-form").classList.remove("hidden");
    } else if (target.id === "new-label-color") {
      const color = rancomColor();
      app.querySelector("#label-color-value").value = color;
      app.querySelector("#label-preview").style.backgroundColor = `#${color}`;
      target.style.backgroundColor = `#${color}`;
      checkInput() && uselabelBtn();
      if (checkInput()) {
        uselabelBtn();
      }
    } else if (target.id === "label-create-button") {
      const label = new Label();
      app.querySelectorAll("dl.form-group.my-2 input").forEach((target) => {
        label[target.id.split("-")[1]] = target.value;
      });
      renderUtils.setItems(
        app,
        [JSON.parse(JSON.stringify(label))],
        MENU.LABEL
      );
    }
  });
