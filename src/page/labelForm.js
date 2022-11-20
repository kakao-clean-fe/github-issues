import { labelFormSelector, createLabelButtonSelector, formColorValueSelector, formNameSelector, formHiddenClass, labelPreviewTextContentSelector, formDescriptionSelector } from "../template/selector"
import { $, activateButton, deactivateButton, toggleClass } from "../util/dom"
import {labelStore$, newLabelColorStore$} from '../store/label';
import { isValid } from "../util/feature";
import {formData$, formHandlers} from "../store/labelForm";

/**
 * dom 관련, add event listener
 */
export class LabelFormComponent {
  constructor() {
    this.addObservers();
    this.addFormEventListener();
  }

  initLabelForm() {
    formData$.name = '';
    formData$.description = '';
  
    this.activateCreateButton(false);
  }

  renderFormName(value) {
    $(formNameSelector).value = value;
    $(labelPreviewTextContentSelector).textContent = value.trim() === '' ? 'Label preview' : value;
  }

  renderCreatingStatus(value) {
    toggleClass(formHiddenClass)($(labelFormSelector));
    value === false && this.initLabelForm();
  }

  addObservers() {
    formHandlers.addSetNameObserver([this.renderFormName.bind(this)]);
    formHandlers.addSetIsCreatingObservers([this.renderCreatingStatus.bind(this)]);
  }

  activateCreateButton(isActivate = false) {
    isActivate ? activateButton($(createLabelButtonSelector)) : deactivateButton($(createLabelButtonSelector));
    $(createLabelButtonSelector).disabled = !isActivate;
  }

  toggleCreateButton(nameInputValue) {
    nameInputValue.trim() !== '' ? this.activateCreateButton(true) : this.activateCreateButton(false);
  }

  /**
   * add form Event Listener 
   */
  addNameInputListener({target:{value}}) {
    formData$.name = value;
    this.toggleCreateButton(value);
  }

  addDescriptionInputListener({target:{value}}) {
    formData$.description = value;
  }

  addColorInputListener({target}) {
    const {value} = target;
    
    if (!value.startsWith('#')) {
      this.value = '#' + value;
    }

    /**
     * 유효한 색상 값일 때만 버튼 & 라벨 프리뷰 색상 변경
     * formData$에 저장하는 것도
     */
    if (isValid(target)) {
      newLabelColorStore$.store.temp = this.value;
      formData$.color = this.value;
    }
  }

  addLabel(e) {
    e.preventDefault();
  
    const {valid, message} = validator.run();
  
    if (!valid) {
      alert(message);
      return;
    }
    
    const {name, color, description} = formData$;

    newLabelColorStore$.store.colors.add(color);
    labelStore$.add({name, color, description});
  }

  addFormEventListener() {
    // name
    $(formNameSelector).addEventListener('input', this.addNameInputListener.bind(this));
    // color
    $(formColorValueSelector).addEventListener('input', this.addColorInputListener);
    // description
    $(formDescriptionSelector).addEventListener('input', this.addDescriptionInputListener);
    // submit
    $(labelFormSelector).addEventListener('submit', this.addLabel);
  }
};

/**
 * validate and submit form
 */
export const validator = {
  checkName() {
    const {name} = formData$;
    
    if (!labelStore$.value.every(label => label.name !== name)) {
      return {valid: false, message: '이미 있는 라벨 이름입니다.'};
    }

    return {valid: true};
  },
  run() {
    const {valid: isValidName, message = ''} = this.checkName();

    if (!isValidName) {
      return {valid: isValidName, message};
    }
  
    return {valid: true};
  }
}
