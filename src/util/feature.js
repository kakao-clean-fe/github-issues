import { TEMP_LABEL_FORM_DATA_KEY } from "../const";
import { $ } from "./dom";

export const getRandom = (arr) => {
  return Math.floor(Math.random() * arr.length);
}

export const isHexColor = (value) => {
  return /^#[0-9A-F]{6}$/i.test(value);
}

export const isValid = (target) => target.validity.valid;
export const isNotDuplicate = (property) => (list, target) => {
  if (list.every(item => item[property] !== target)) {
    return true;
  }

  return false;
}

export const setInputValue = (selector, newValue) => {
  const target = $(selector);

  if (!target || target.value === newValue) {
    return;
  }

  target.value = newValue;
}
/**
 * local storage 관련
 */
export const getTargetStorageItem = (key) => {
  return {
    get() {
      return localStorage.getItem(key);
    },
    set(value) {
      localStorage.setItem(key, value);
    },
    remove() {
      localStorage.removeItem(key);
    }
  }
}

export const getFormStorage = () => getTargetStorageItem(TEMP_LABEL_FORM_DATA_KEY);
