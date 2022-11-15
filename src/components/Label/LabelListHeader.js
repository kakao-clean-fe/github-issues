import {Component} from "..";
import { querySelector } from "../../utils/dom-selector";
export default class LabelListHeader extends Component{
  #templateStr = `
    <div class="label-header h-16 flex justify-between items-center border-b">
      <div class="mr-3 d-none pl-4">
        <div class="whitespace-nowrap open-count font-bold cursor-pointer">6 Labels</div>
      </div>
      <div class="details-list flex ml-auto">
        <details>
          <summary>Sort</summary>
        </details>
      </div>
    </div>
  `;
  constructor(count){
    super();
    this.count = count;
    this.template = this.convertElement(this.#templateStr);
    this.render('#labels-wrapper');

    this.setCountTemplate(count);
  }
  setCountTemplate(count){
    querySelector('.open-count').innerHTML = `${count} Labels`;
  }
}