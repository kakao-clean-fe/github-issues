import { labelFormSelector, createLabelButtonSelector, formColorValueSelector, formNameSelector, formHiddenClass, labelPreviewTextContentSelector, formDescriptionSelector, labelCreateCancelButtonSelector, newLabelColorSelector } from "../template/selector"
import { $, activateButton, addClickEventListener, deactivateButton, toggleClass } from "../util/dom"
import {labelStore$, newLabelColorStore$} from '../store/label';
import { getFormStorage, isValid } from "../util/feature";
import {formData$, formHandlers} from "../store/labelForm";
import { TEMP_LABEL_FORM_DATA_KEY } from "../const";

/**
 * dom 관련, add event listener
 */
export class LabelFormComponent {
  /**
   * observer 등록, 이벤트 핸들러 등록
   */
  constructor() {
    this.formStorage = getFormStorage();

    this.addObservers();
    this.addFormEventListener();
    this.checkLocalStorageFormData();
  }

  addObservers() {
    // formData 관련 observer
    formHandlers.addSetNameObserver([this.renderFormName.bind(this)]);
    formHandlers.addSetIsCreatingObservers([this.renderCreatingStatus.bind(this)]);
  
    // label 관련 observer
    labelStore$.subscribeAdd([this.initForm.bind(this)]);
  }

  /**
   * 로컬스토리지에 캐시된 폼 데이터가 있다면 화면에 렌더
   */
  checkLocalStorageFormData() {
    const _value = this.formStorage.get();

    if (!_value) {
      return;
    }
    
    const value = JSON.parse(_value);
    
    let needToActivateCreateButton = false;

    Object.entries(value).forEach(([key, value]) => {
      formData$[key] = value;
      value && (needToActivateCreateButton = true);
    })

    needToActivateCreateButton ? this.activateCreateButton(true) : this.activateCreateButton(false);
  }

  initForm() {
    formData$.name = '';
    formData$.description = '';
  
    this.activateCreateButton(false);
    this.formStorage.remove();
  }

  renderFormName(value) {
    $(formNameSelector).value = value;
    $(labelPreviewTextContentSelector).textContent = value.trim() === '' ? 'Label preview' : value;
  }

  renderCreatingStatus() {
    toggleClass(formHiddenClass)($(labelFormSelector));
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

  updateLabelColor() {
    formData$.color = newLabelColorStore$.store.next;
  }

  cancelForm() {
    formData$.isCreating = !formData$.isCreating;

    this.initForm();
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

    // color selector
    addClickEventListener(newLabelColorSelector, () => this.updateLabelColor());
    // cancel 버튼
    addClickEventListener(labelCreateCancelButtonSelector, this.cancelForm.bind(this))
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
