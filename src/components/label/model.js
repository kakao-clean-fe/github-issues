import View from "../../libs/view.js";
import {selectOne} from "../../utils.js";
import {getLabelItemTpl} from "../../tpl.js";
import LabelStore from "../../stores/label.js";
import AppState from "../../libs/state.js";
import {TAB} from "../../constants.js";

class LabelItem extends View {
  constructor(item = {}) {
    super();
    this.data = item
  }

  get $targetEl() {
    return selectOne('#app ul.label-list')
  }

  getTemplate(state) {
    return getLabelItemTpl(this.data)
  }

  bindEvents() {
    const {deleteButton} = this.$
    deleteButton.addEventListener('click', () => {
      LabelStore.remove(this)
    })
  }

  get $() {
    const querySelector = (selector) => this.contents?.querySelector(selector)
    return {
      editButton: querySelector('.edit-button'),
      deleteButton: querySelector('.delete-button'),
    }
  }

  render() {
    const {activeTab} = AppState.get()
    if (activeTab === TAB.LABEL) super.render()
  }
}

export default LabelItem
