import Component from "..";
import LabelListBody from "./LabelListBody";
import LabelListHeader from "./LabelListHeader";

export default class LabelList extends Component{
  #templateStr = `
    <div id="labels-wrapper" class="m-auto  base-outer mt-6 bg-slate-100">
    <div>
  `;
  constructor(model){
    super();
    this.template = this.convertElement(this.#templateStr);
    this.render('#label-wrapper');
    this.model = model;
    this.header = new LabelListHeader(model.labelList.length);
    this.model.subscribe(this.updatedLabelList.bind(this));
    this.body = new LabelListBody(model.labelList);
  }
  updatedLabelList(){
    this.header.setCountTemplate(this.model.labelList);
  }
}