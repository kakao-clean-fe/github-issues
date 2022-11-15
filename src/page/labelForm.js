import { labelFormSelector, createLabelButtonSelector, formColorValueSelector, formNameSelector, formHiddenClass } from "../template/selector"
import { $, activateButton, deactivateButton, toggleClass } from "../util/dom"
import {labelStore$, newLabelColorStore$} from '../store/label';
import {updateProperty} from '../store/proxy';
import { showLabelFormFirst } from "../const";
import { isValid } from "../util/feature";

/**
 * 다른 곳에서 쓰지 않아 page에서 store 정의
 */
const initLabelForm = () => {
  formData$.name = '';
  formData$.description = '';
}

const formData = {
  isCreating: showLabelFormFirst,
  name: '',
  description: '',
  color: newLabelColorStore$.curr,
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
const toggleCreateButton = (value) => {
  if (value.trim() !== '') {
    activateButton($(createLabelButtonSelector));
    $(createLabelButtonSelector).disabled = false;
  } else {
    deactivateButton($(createLabelButtonSelector));
    $(createLabelButtonSelector).disabled = true;
  }
}

export const addFormEventListener = () => {
  $(formNameSelector).addEventListener('input', ({target:{value}}) => {
    formData$.name = value;
    toggleCreateButton(value);
  });

  $(formColorValueSelector).addEventListener('input', function({target:{value}}) {
    if (!value.startsWith('#')) {
      this.value = '#' + value;
    }

    if (isValid(this)) {
      newLabelColorStore$.temp = this.value;
      formData$.color = this.value;
    }
  })
  
  $(labelFormSelector).addEventListener('submit', addLabel)
}

/**
 * validate and submit form
 */
const validate = () => {
  const {name} = formData$;

  if (!labelStore$.every(label => label.name !== name)) {
    return {valid: false, message: '이미 있는 라벨 이름입니다.'};
  }

  return {valid: true};
}

const addLabel = (e) => {
  e.preventDefault();

  const {valid, message} = validate();

  if (!valid) {
    alert(message);
    return;
  }
  
  const {name, color, description} = formData$;
  newLabelColorStore$.colors = newLabelColorStore$.colors.add(color);
  labelStore$.push({name, color, description});
}

