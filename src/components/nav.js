import {selectAll} from "../utils.js";
import {TAB} from "../constants.js";
import AppState from "../libs/state.js";


class Nav {
  constructor() {
    this.bindEvents()
  }

  bindEvents() {
    this.$tabButtons.forEach(($tabBtn) => {
      $tabBtn.addEventListener("click", ({target: {classList}}) => {
        AppState.update({activeTab: classList.contains("issue") ? TAB.ISSUE : TAB.LABEL})
      })
    })
  }

  get $tabButtons() {
    return selectAll("nav .tab")
  }
}

export default Nav
