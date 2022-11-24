import {alertTpl} from "../tpl.js";
import {selectOne} from "./utils.js";
import {ERROR_TYPE} from "../constants.js";

const alertMessage = ({type, message}) => {
  const el = alertTpl({type: type, message: message})

  /* mount */
  selectOne("#alert-portal").appendChild(el)

  /* fade-out */
  setTimeout(() => {
    if (el) {
      el.classList.add("fade-out")
      el.addEventListener('animationend', () => {
        el.style.display = 'none';
        el.remove()
      });
    }
  }, 100000)

  /* click */
  el.addEventListener("click", () => {
      el.remove()
    })
}

export const errorAlert = (message) => alertMessage({type: ERROR_TYPE.ERROR, message: message})
export const successAlert = (message) => alertMessage({type: ERROR_TYPE.SUCCESS, message: message})
export const warningAlert = (message) => alertMessage({type: ERROR_TYPE.WARNING, message: message})
export const infoAlert = (message) => alertMessage({type: ERROR_TYPE.INFO, message: message})

export default alertMessage
