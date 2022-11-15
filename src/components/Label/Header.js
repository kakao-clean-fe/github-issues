import {Component} from "..";
import NewLabelButton from "./NewLabelButton";
export default class Header extends Component{
  #templateStr = `
    <div id="header" class="flex justify-between">
      <div class="filter-menu w-2/3 px-3 py-1 flex base-outer items-center">
        <form action="/" class="p-1 w-full">
          <input type="text" class="w-full bg-slate-100 focus:outline-none" name="filter-text" id="filter-input"
            placeholder="search all filter...">
        </form>
      </div>
    </div>
  `;
  constructor(model){
    super();
    this.template = this.convertElement(this.#templateStr);
    this.render('#label-wrapper');

    this.newLabelButton = new NewLabelButton(model);
  }
}