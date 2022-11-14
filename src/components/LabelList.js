import Element from "./Element";
import LabelListBody from "./LabelListBody";
import LabelListHeader from "./LabelListHeader";

export default class LabelList extends Element{
  constructor(labelDataList){
    super();
    this.labelDataList = labelDataList;
    this.header = new LabelListHeader(labelDataList);
    this.body = new LabelListBody(labelDataList);
    this.template = 
      `
      <div id="labels-wrapper" class="m-auto  base-outer mt-6 bg-slate-100">
        ${this.header.getTemplate()}
        ${this.body.getTemplate()}
      </div>`;
  }
}