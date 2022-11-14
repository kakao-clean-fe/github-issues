import Component from "..";

const newLabelButtonStr = `
<div class="new-label-button cursor-pointer p-1 py-1 base-outer flex items-center justify-center w-2/12 ml-4 bg-green-700 text-white">
  <a href="#">New label</a>
</div>
`;
export default class NewLabelButton extends Component{
  constructor(model){
    super(model);
    this.template = this.convertElement(newLabelButtonStr);
    this.render('#header');
    this.setOnClickListener(this.template, this.clickEvent.bind(this));
  }
  clickEvent(){
    this.formStateModel.setIsOpen(!this.formStateModel.getIsOpen());
  }
}