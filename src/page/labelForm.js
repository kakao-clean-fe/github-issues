import { labelFormSelector, createLabelButtonSelector, formColorValueSelector, formNameSelector, formHiddenClass, labelPreviewTextContentSelector, formDescriptionSelector, labelCreateCancelButtonSelector, newLabelColorSelector, labelPreviewSelector } from "../template/selector"
import { $, activateButton, addClickEventListener, deactivateButton, toggleClass } from "../util/dom"
import { labelStore$ } from '../store/label';
import { getFormStorage, isHexColor, isNotDuplicate, isValid, setInputValue } from "../util/feature";
import { formData$, formHandlers } from "../store/labelForm";
import { omit, pipe } from "../util/operator";
import { newLabelColorStore$ } from '../store/color';
import { colorList, DUPLICATE_LABEL_NAME_MESSAGE } from "../const";

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
    this.checkLocalStorageFormData();
    !isHexColor(formData$.color) && this.updateFormDataColor();
    
    const addEvents = pipe(this.addFormEventListener.bind(this), this.addWindowListener.bind(this));
    addEvents();
  }

  /**
   * proxy로 만든 store는 따로 만든 handler에 observer 등록
   * Observable 클래스로 만든 store는 해당 store에 observer 등록
   */
  addObservers() {
    // formData 관련 observer
    formHandlers.addSetNameObserver([
      this.setNameInputValue.bind(this),
      this.toggleCreateButton.bind(this),
    ]);
    formHandlers.addSetIsCreatingObservers([this.renderCreatingStatus.bind(this)]);
    formHandlers.addSetColorObservers([
      this.renderLabelColor.bind(this),
      this.setColorInputValue.bind(this),
    ]);
    formHandlers.addSetDescriptionObservers([this.setDescriptionInputValue.bind(this)]);

    // 새로운 라벨 추가시 observer
    labelStore$.subscribeAdd([this.initForm.bind(this)]);
  }

  /**
   * 로컬스토리지에 캐시된 폼 데이터가 있다면 화면에 렌더
   * 로컬스토리지에 저장된 데이터 없으면 initial color 렌더
   */
  checkLocalStorageFormData() {
    const _value = this.formStorage.get();
    
    if (!_value) {
      return;
    }
    
    const value = JSON.parse(_value);
    /**
     * label name은 필수값, description은 옵션으로 설정함
     */
    Object.entries(value).forEach(([key, value]) => {
      // 유효하지 않은 색상이 저장된 경우 No Set
      if (key === 'color' && !isHexColor(value)) {
        return;
      }
      
      formData$[key] = value;
    })
    
    this.formStorage.remove();
  }

  initForm() {
    formData$.name = '';
    formData$.description = '';
  }

  /**
   * formData$ 변경시 동작하는 함수들 (observers)
   */
  setNameInputValue(newValue) {
    setInputValue(formNameSelector, newValue);
    $(labelPreviewTextContentSelector).textContent = newValue.trim() === '' ? 'Label preview' : newValue;
  }

  toggleCreateButton(nameInputValue) {
    nameInputValue.trim() !== '' ? this.activateCreateButton(true) : this.activateCreateButton(false);
  }

  activateCreateButton(isActivate = false) {
    isActivate ? activateButton($(createLabelButtonSelector)) : deactivateButton($(createLabelButtonSelector));
    $(createLabelButtonSelector).disabled = !isActivate;
  }

  setColorInputValue(newColor) {
    if (!isHexColor(newColor)) {
      return;
    }

    setInputValue(formColorValueSelector, newColor);
  }

  // formData$.color 변경시 동작
  renderLabelColor(newColor) {
    const targetEls = [$(labelPreviewSelector), $(newLabelColorSelector)];
    
    targetEls.forEach(el => (el.style.backgroundColor = newColor));
  }

  setDescriptionInputValue(newValue) {
    setInputValue(formDescriptionSelector, newValue);
  }

  renderCreatingStatus() {
    toggleClass(formHiddenClass)($(labelFormSelector));
  }

  /**
   * add form Event Listener 
   */
  addNameInputListener({target:{value}}) {
    formData$.name = value;
  }

  addDescriptionInputListener({target:{value}}) {
    formData$.description = value;
  }

  addColorInputListener({target}) {
    const {value} = target;
    
    if (!value.startsWith('#')) {
      target.value = '#' + value;
    }

    /**
     * 유효한 색상 값일 때만 버튼 & 라벨 프리뷰 색상 변경
     * formData$에 저장하는 것도
     */
    if (isValid(target)) {
      formData$.color = target.value;
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

    labelStore$.add({name, color, description});
  }

  updateFormDataColor() {
    formData$.color = newLabelColorStore$.next;
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
    addClickEventListener(newLabelColorSelector, () => this.updateFormDataColor());
    // cancel 버튼
    addClickEventListener(labelCreateCancelButtonSelector, this.cancelForm.bind(this))
  }

  addWindowListener() {
    window.addEventListener('beforeunload', () => {
      const {name, description, color} = formData$;

      if (!name && !description && color === colorList[0] && !isHexColor(color)) {
        return;
      }

      this.formStorage.set(JSON.stringify(omit(formData$, 'isCreating')));
    })
  }
};

/**
 * validate and submit form
 */
export const validator = {
  /**
   * 이름 중복 검사
   */
  checkName(name) {
    const isNotDuplicateName = isNotDuplicate('name');
    const isValid = isNotDuplicateName(labelStore$.value, name);

    return isValid ? {valid: true} : {valid: false, message: DUPLICATE_LABEL_NAME_MESSAGE};
  },
  run() {
    const {name} = formData$;

    const {valid, message = ''} = this.checkName(name);

    return {valid, message};
  }
}
