import Component from "../../core/component"
import { labelStoreMixin } from "../../core/mixin/labelStore";

export class LabelList extends Component {
  static getInstance (...args) {
    Object.assign(LabelList.prototype, labelStoreMixin);

    return new LabelList(...args)
  }

  initState () {
    this.state = {
      labelListSize: () => this.labelState.labelList.length
    }
  }

  onclickRefreshLabelsButton () {
    this.fetchDelayLabel();
  }

  get events () {
    return [{
      selector: '.refresh-labels',
      event: 'click',
      callback: () => this.onclickRefreshLabelsButton(),
    }]
  }

  get template () {
    return `
    <div id="labels-wrapper" class="m-auto base-outer mt-6 bg-slate-100">
    <div class="label-header h-16 flex justify-between items-center border-b">
      <div class="mr-3 d-none pl-4">
        <div class="whitespace-nowrap open-count font-bold cursor-pointer">${this.state.labelListSize()} Labels</div>
      </div>

      <div class="details-list flex ml-auto">
        <details>
          <summary>Sort</summary>
        </details>
      </div>
    </div>
    <ul class="label-list ml-auto text-sm bg-white">
      ${this.labelState.labelList && this.labelState.labelList.map(label => {
        return `
          <li class="label-item flex items-center ml-4 py-3 justify-between border-b ">
            <div class="issue-title flex"> 
                <span class="rounded-lg border p-1 px-2" style="background-color:#${label.color}">${label.name}</span> 
            </div>
            <div class="issue-description ">${label.description}</div>
            <div class="issue-description ">3 issues </div>
            <div class="label-editor pr-4 ">
              <button class="edit-button mx-2 ">edit</button>
              <button class="delete-button">delete</button>
            </div>
          </li>`}).join('')
        }
    </ul>
    <button class="refresh-labels base-outer p-2 mt-2 float-right">update labels</button>
  </div>`
  }
}