import { getLabelTpl } from "../template";
import { getData } from "../api";
import LabelRenderer from "../components/LabelRenderer";
import Labels from "../store/labels";
import { $ } from "../constants";

export const renderLabel = async () => {
  const labelData = await getData("labels");
  $("#app").innerHTML = getLabelTpl();
  const labelStore = new Labels();
  new LabelRenderer(labelStore);
  labelData.forEach((label) => labelStore.add(label));
};
