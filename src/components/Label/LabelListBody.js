import Element from "./Element";
import LabelListRow from "./LabelListRow";

export default class LabelListBody extends Element{
  constructor(labelDataList){
    super();
    this.template = `
      <ul class="label-list ml-auto text-sm bg-white">
      ${labelDataList.map(labelData => new LabelListRow(labelData).getTemplate())}
      </ul>
    `;
    this.element = null;
  }
}