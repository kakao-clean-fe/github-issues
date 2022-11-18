import {selectOne} from "../../utils.js";
import {getLabelTpl} from "../../tpl.js";
import {TAB} from "../../constants.js";
import View from "../../libs/view.js";
import AppState from "../../libs/state.js";


class LabelTab extends View {
  get $targetEl() {
    return selectOne('#app')
  }

  mountFunction(node) {
    this.$targetEl.innerHTML = ''
    return super.mountFunction(node);
  }

  getTemplate(state) {
    const {activeTab, labels} = state
    return getLabelTpl({
      numLabels: labels?.length || 0,
      show: activeTab === 'label',
    })
  }

  bindEvents() {
    // toggle new label button
    this.$newLabelButton.addEventListener('click', () => {
      const {showNewLabel} = AppState.get()
      AppState.update({showNewLabel: !showNewLabel})
    })
  }

  get $newLabelButton() {
    return this.$targetEl.querySelector(".new-label-button")
  }

  render() {
    const {activeTab} = AppState.get()
    if (activeTab === TAB.LABEL) super.render()
  }
}


export default LabelTab
