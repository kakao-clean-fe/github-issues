import Component from "..";
import LabelListRow from "./LabelListRow";

export default class LabelListBody extends Component{
  constructor(labelDataList){
    super();
    this.template = `
      <ul class="label-list ml-auto text-sm bg-white">
      ${labelDataList.map(labelData => new LabelListRow(labelData).getTemplate())}
      </ul>
    `;
    this.Component = null;
  }
}