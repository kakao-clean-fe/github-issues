import ComponentRefactor from "../../core/component_refactor"
import { labelStoreMixin } from "../../core/mixin/labelStore";

export class LabelMaker extends ComponentRefactor {
  static getInstance (...args) {
    Object.assign(LabelMaker.prototype, labelStoreMixin);

    return new LabelMaker(...args)
  }

  onChangeLabelName (event) {
    this.setLabelName(event.target.value);
  }

  onChangeDescription (event) {
    this.setDescription(event.target.value);
  }

  onChangeColor (event) {
    this.setColor(event.target.value);
  }

  onClickChangeColorButton () {
    const randomHexColor = Math.floor(Math.random() * 16777215).toString(16);

    this.setColor(`#${randomHexColor}`)
  }

  initState () {
    this.state = {
      isActiveCreateLabelButton: () => !!this.labelState.labelName && !!this.labelState.description && !!this.labelState.color,
    }
  }

  get events () {
    return [{
      selector: '.new-label-button',
      event: 'click',
      callback: () => this.props.onClickNewLabelButton(),
    },
    {
      selector: '#label-name-input',
      event: 'input',
      callback: (event) => this.this.setLabelName(event.target.value),
    },
    {
      selector: '#label-description-input',
      event: 'input',
      callback: (event) => this.onChangeDescription(event),
    },
    {
      selector: '#label-color-value',
      event: 'input',
      callback: (event) => this.onChangeColor(event),
    },
    {
      selector: '#new-label-color',
      event: 'click',
      callback: () => this.onClickChangeColorButton(),
    },
    {
      selector: '#cancel-button',
      event: 'click',
      callback: () => this.props.onClickCancelButton(),
    },
    {
      selector: '#label-create-button',
      event: 'click',
      callback: () => this.props.onClickCreateLabelButton(),
    }
  ]}

  get template () {
    return `
    <div id="maker-wrapper">
    <div id="header" class="flex justify-between">
      <div class="filter-menu w-2/3 px-3 py-1 flex base-outer items-center">
        <form action="/" class="p-1 w-full">
          <input type="text" class="w-full bg-slate-100 focus:outline-none" name="filter-text" id="filter-input"
            placeholder="search all filter...">
        </form>
      </div>
      <div class="new-label-button cursor-pointer p-1 py-1 base-outer flex items-center justify-center w-2/12 ml-4 bg-green-700 text-white">
        <a href="#">New label</a>
      </div>
    </div>
    <form class="${!this.props.isOpenLabelMakerLayer && 'hidden'} p-3 mb-3 mt-6 border rounded-sm font-bold" id="new-label-form" action="/labels" accept-charset="UTF-8" method="post">
      <div class="form-group mt-0 mb-2"
        data-url-template="/labels/preview/" data-default-name="Label preview">
    
        <span id="label-preview" class="rounded-lg border p-2 px-3 mt-2 inline-block" style="background-color: ${this.labelState.color}">
          ${this.labelState.labelName}
        </span>
      </div>
      <div id="label-input-wrapper" class="flex justify-between items-start mb-2">
        <!--new label name-->
        <dl
          class="form-group my-2">
          <dt class=" flex justify-between items-center">
            <label for="label-name-input" class="f5">Label name</label>
            <span class="text-sm " data-suffix="remaining" role="none" hidden="">
              50 remaining
            </span>
          </dt> 
          <dd class="relative mt-2">
            <text-expander keys=":" data-emoji-url="/autocomplete/emoji?use_colon_emoji=true">
              <input type="text" data-maxlength="50" autocomplete="off" required="" pattern="^(?!(\.|\.\.)$).*$"
                id="label-name-input" name="label[name]"
                class="w-full p-2 base-outer focus:outline-none" placeholder="Label name" value="${this.labelState.labelName}" >
            </text-expander>
          </dd>
          <dd class="" hidden="" id="label--name-error"></dd>
        </dl>
        <!--END new label name-->
    
        <!--new label description-->
        <dl
          class="form-group my-2">
          <dt class="flex justify-between items-center ">
            <label for="label-description-input" class="f5">Description</label>
            <span class="text-sm" data-suffix="remaining"
              role="none" hidden="">
              100 remaining
            </span>
          </dt>
          <dd class="mt-2">
            <input type="text" id="label-description-input" name="label[description]"
              class="w-full p-2 base-outer focus:outline-none"
              placeholder="Description" value="${this.labelState.description}" 
              maxlength="100">
          </dd>
          <dd class="" hidden="" id="label--description-error"></dd>
        </dl>
        <!--END new label description-->
    
        <!--new label color-->
        <dl class="form-group my-2">
          <dt>
            <label class="f5">Color</label>
          </dt>
          <dd class="mt-2 flex">
    
            <button id="new-label-color" type="button"
              data-view-component="true"
              class="rounded-md border px-1 bg-pink-700 font-bold text-4xl"
              aria-labelledby="tooltip-1664858299420-7732">
              ⟳
            </button>
            <tool-tip for="new-label-color" data-direction="s" data-type="label" data-view-component="true"
              class="sr-only position-absolute" id="tooltip-1664858299420-7732" aria-hidden="true" role="tooltip">Get
              a new color</tool-tip>
            <div class="ml-2">
              <input type="text" id="label-color-value" name="label-color[description]"
              class="w-full p-2 base-outer focus:outline-none"
              placeholder="#color" value="${this.labelState.color}" maxlength="100">
            </div>
    
          </dd>
        </dl>
        <!--END new label color-->
    
        <!--new label actions-->
        <div
          class="form-group my-2 flex mt-10">
          <button id="cancel-button" type="button" class="base-outer p-2 mr-4"> Cancel
          </button>
          <button id="label-create-button" type="submit" class="base-outer p-2 mr-4 bg-green-700 ${!this.state.isActiveCreateLabelButton() && 'opacity-50'} text-white" ${!this.state.isActiveCreateLabelButton() && "disabled"}> Create label
          </button>
        </div>
        <!--END new label actions-->
      </div>
    </form>
    </div>
    `
  }
}