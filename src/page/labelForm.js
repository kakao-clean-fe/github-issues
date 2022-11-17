import { labelFormSelector, createLabelButtonSelector, formColorValueSelector, formNameSelector, formHiddenClass } from "../template/selector"
import { $, activateButton, deactivateButton, toggleClass } from "../util/dom"
import {labelStore$, newLabelColorStore$, colorList} from '../store/label';
import {updateProperty} from '../store/proxy';
import { showLabelFormFirst } from "../const";
import { isValid } from "../util/feature";

/**
 * 다른 곳에서 쓰지 않아 page에서 store 정의
 */
const initLabelForm = () => {
  formData$.name = '';
  formData$.description = '';

  labelFormComponent.activateCreateButton(false);
}

const formData = {
  isCreating: showLabelFormFirst,
  name: '',
  description: '',
  color: colorList[0],
};

export const formData$ = new Proxy(formData, {
  set(obj, prop, value, receiver) {
    if (prop === 'name') {
      return updateProperty({
        obj, prop, value, receiver, 
        callback: () => {
          $(formNameSelector).value = value;
        }
      })
    }

    if (prop === 'isCreating') {
      if (typeof value !== 'boolean') {
        return false;
      }

      return updateProperty({
        obj, prop, value, receiver, 
        callback: () => {
          toggleClass(formHiddenClass)($(labelFormSelector));
          // obj[prop] = value 동작 안 함
          value === false && initLabelForm();
        }
      })
    }

    return updateProperty({obj, prop, value, receiver});
  }
})

/**
 * dom 관련, add event listener
 */
export const labelFormComponent = {
  activateCreateButton(isActivate = false) {
    isActivate ? activateButton($(createLabelButtonSelector)) : deactivateButton($(createLabelButtonSelector));
    $(createLabelButtonSelector).disabled = !isActivate;
  },
  toggleCreateButton(nameInputValue) {
    nameInputValue.trim() !== '' ? this.activateCreateButton(true) : this.activateCreateButton(false);
  },
  addNameInputListener({target:{value}}) {
    formData$.name = value;
    this.toggleCreateButton(value);
  },
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
  },
  addLabel(e) {
    e.preventDefault();
  
    const {valid, message} = validator.run();
  
    if (!valid) {
      alert(message);
      return;
    }
    
    const {name, color, description} = formData$;

    newLabelColorStore$.store.colors.add(color);
    labelStore$.push({name, color, description});
  },
  addFormEventListener() {
    // name
    $(formNameSelector).addEventListener('input', this.addNameInputListener.bind(this));
    // color
    $(formColorValueSelector).addEventListener('input', this.addColorInputListener);
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

    if (!labelStore$.every(label => label.name !== name)) {
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
