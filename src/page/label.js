import { getLabelTpl } from "../template";
import { getData } from "../api";
import Labels from "../model/labels";
import LabelView from "../components/Labels";

export const renderLabel = async () => {
  const labelData = await getData("labels");
  const app = document.querySelector("#app");
  app.innerHTML = getLabelTpl();

  const labels = new Labels();
  labels.allLabels = labelData;

  const labelView = new LabelView(labels);
  labelView.render();
};
