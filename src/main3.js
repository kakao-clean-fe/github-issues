import { getElement } from './utils/element';
import ComponentRefactor from './core/component_refactor';
import { request } from './utils/api';

class Main extends ComponentRefactor {
  clearInputField () {
    this.state.labelName = '';
    this.state.description = '';
    this.state.color = '';
  }

  onClickCreateLabelButton () {
    const nextLabelList = [...this.state.labelList, {
      name: this.state.labelName,
      color: this.state.color,
      description: this.state.description,
    }]

    this.setState({...this.state, labelList: nextLabelList});
    this.clearInputField();
  }

  onClickNewLabelButton () {
    this.setState({...this.state, isOpenLabelMakerLayer: !this.state.isOpenLabelMakerLayer})
  }

  onClickCancelButton () {
    this.setState({...this.state, isOpenLabelMakerLayer: false})
  }

  onChangeLabelName (event) {
    // TODO wes: change 이벤트 실행 후 focus 로직 추가 필요 
    this.setState({...this.state, labelName: event.target.value});
  }

  onChangeDescription (event) {
    this.setState({...this.state, description: event.target.value});
  }

  onChangeColor (event) {
    this.setState({...this.state, color: event.target.value});
  }

  onClickChangeColorButton () {
    const randomHexColor = Math.floor(Math.random() * 16777215).toString(16);

    this.setState({...this.state, color: `#${randomHexColor}`});
  }

  initState () {
    this.state = {
      labelList: null,
      isOpenLabelMakerLayer: false,
      labelName: '',
      description: '',
      color: '',
      labelListSize: () => this.state.labelList.length,
      isActiveCreateLabelButton: () => !!this.state.labelName && !!this.state.description && !!this.state.color,
    }
  }

  created () {
    request('/data-sources/labels.json')
      .then(data => {
        this.setState({...this.state, labelList: data});
      })
  }

  mounted() {}

  get events () {
    return [{
      selector: '.new-label-button',
      event: 'click',
      callback: () => this.onClickNewLabelButton(),
    },
    {
      selector: '#label-name-input',
      event: 'input',
      callback: (event) => this.onChangeLabelName(event),
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
      callback: () => this.onClickCancelButton(),
    },
    {
      selector: '#label-create-button',
      event: 'click',
      callback: () => this.onClickCreateLabelButton(),
    }
  ]
  }

  get template () {
    return `
    <div id="label-wrapper" class="w-9/12 m-auto min-w-min">

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
  
  
    <form class="${!this.state.isOpenLabelMakerLayer && 'hidden'} p-3 mb-3 mt-6 border rounded-sm font-bold" id="new-label-form" action="/labels" accept-charset="UTF-8" method="post">
      <div class="form-group mt-0 mb-2"
        data-url-template="/labels/preview/" data-default-name="Label preview">
  
        <span id="label-preview" class="rounded-lg border p-2 px-3 mt-2 inline-block" style="background-color: ${this.state.color}">
          ${this.state.labelName}
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
                class="w-full p-2 base-outer focus:outline-none" placeholder="Label name" value="${this.state.labelName}" >
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
              placeholder="Description" value="${this.state.description}" 
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
              placeholder="#color" value="${this.state.color}" maxlength="100">
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
  
  
    <div id="labels-wrapper" class="m-auto  base-outer mt-6 bg-slate-100">
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
        ${this.state.labelList && this.state.labelList.map(label => {
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
    </div>
  </div>
    `
  }
}

new Main(getElement('#app')).render();