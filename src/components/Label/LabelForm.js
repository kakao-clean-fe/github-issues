import {Button, Component} from "..";

export default class LabelForm extends Component{
  #templateStr = `
    <form class="hidden p-3 mb-3 mt-6 border rounded-sm font-bold" id="new-label-form" action="/labels" accept-charset="UTF-8" method="post">
      <div class="form-group mt-0 mb-2"
        data-url-template="/labels/preview/" data-default-name="Label preview">

        <span id="label-preview" class="rounded-lg border bg-pink-700 p-2 px-3 mt-2 inline-block">
          Label preview
        </span>
      </div>
    </form>
  `;
  constructor(model){
    super();
    this.template = this.convertElement(this.#templateStr); 
    this.render('#label-wrapper');
    this.labelInputDiv = new LabelInputDiv(model);

    model.form.subscribe(this.toggleForm.bind(this));
  }
  toggleForm(){
    this.template.classList.toggle('hidden');
  }
}

class LabelInputDiv extends Component{
  #templateStr = `
    <div id="label-input-wrapper" class="flex justify-between items-start mb-2">
    </div>
  `;
  constructor(model){
    super();
    this.template = this.convertElement(this.#templateStr);
    this.render('#new-label-form'); 
    this.labelNameInput = new LabelNameInput();
    this.labelDescriptionInput = new LabelDescriptionInput();
    this.labelColorInput = new LabelColorInput();
    this.labelActionDiv = new LabelActionDiv(model);
  }
}

class LabelNameInput extends Component{
  #templateStr = `
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
            class="w-full p-2 base-outer focus:outline-none" placeholder="Label name" value="" >
        </text-expander>
      </dd>
      <dd class="" hidden="" id="label--name-error"></dd>
    </dl>
  `;
  constructor(){
    super();
    this.template = this.convertElement(this.#templateStr);
    this.render('#label-input-wrapper'); 
  }
}
class LabelDescriptionInput extends Component{
  #templateStr = `
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
          placeholder="Description" value="" 
          maxlength="100">
      </dd>
      <dd class="" hidden="" id="label--description-error"></dd>
    </dl>
  `;
  constructor(){
    super();
    this.template = this.convertElement(this.#templateStr);
    this.render('#label-input-wrapper'); 
  }
}
class LabelColorInput extends Component{
  #templateStr = `
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
          placeholder="#color" value="" maxlength="100">
        </div>

      </dd>
    </dl>
  `;
  constructor(){
    super();
    this.template = this.convertElement(this.#templateStr);
    this.render('#label-input-wrapper'); 
  }
}
class LabelActionDiv extends Component{
  #templateStr = `
    <div id="form-button-group" class="form-group my-2 flex mt-10">
    </div>
  `;
  constructor(formModel){
    super();
    this.template = this.convertElement(this.#templateStr);
    this.render('#label-input-wrapper'); 

    this.cancelButton = new CancelButton(formModel);
    this.submitButton = new SubmitButton(formModel);
  }
}
class CancelButton extends Button{
  #templateStr = `
    <button type="button" class="base-outer p-2 mr-4"> Cancel
    </button>
  `;
  constructor(model){
    super();
    this.template = this.convertElement(this.#templateStr);
    this.render('#form-button-group'); 
    const event = () => model.form.isOpen = false;
    this.setOnClickListener(this.template, event);
  }
};
class SubmitButton extends Button{
  #templateStr = `
    <button id="label-create-button" type="submit" class="base-outer p-2 mr-4 bg-green-700 opacity-50 text-white" disabled=""> Create label
    </button>
  `;
  constructor(model){
    super();
    this.template = this.convertElement(this.#templateStr);
    this.render('#form-button-group'); 
    // const event = () => formModel.isOpen = false;
    this.setOnClickListener(this.template, (e)=>{
      const newLabel = {name: 'enhancement', color: 'a2eeef', description: 'thi'};
      model.label.addLabelList(newLabel);
    });
  }
};