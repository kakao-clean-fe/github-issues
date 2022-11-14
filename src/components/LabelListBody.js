import { convertElement } from "../utils/template";
import LabelListRow from "./LabelListRow";

export default class LabelListBody{
  constructor(labelDataList){
    this.template = `
      <ul class="label-list ml-auto text-sm bg-white">
      ${labelDataList.map(labelData => new LabelListRow(labelData).getTemplate())}
      </ul>
    `;
    this.element = null;
  }
  getTemplate(){
    return this.template;
  }
}