import {Component} from "..";
import LabelListRow from "./LabelListRow";

export default class LabelListBody extends Component{
  #templateStr = `
    <ul class="label-list ml-auto text-sm bg-white">
    </ul>
  `;
  constructor(labelList){
    super();
    this.template = this.convertElement(this.#templateStr);
    this.render('#labels-wrapper');
    this.labelListTemplate = labelList.map(labelData => new LabelListRow(labelData));
  }
}