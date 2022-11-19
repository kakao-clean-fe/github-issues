import {requestPost, selectOne} from "../../utils.js";
import {getLabelTpl} from "../../tpl.js";
import {TAB} from "../../constants.js";
import View from "../../libs/view.js";
import AppState from "../../libs/state.js";
import LabelStore from "../../stores/label.js";


const localState = {
  controller: undefined,
  isFormImported: false
}


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
    const handleNewLabelButton = () => {
      if (!localState.isFormImported) {
        import("./form.js")
          .then(module => module.default)
          .then((LabelForm) => {
            localState.isFormImported = true
            new LabelForm()
            const {showNewLabel} = AppState.get()
            AppState.update({showNewLabel: !showNewLabel})
          })
      } else {
        const {showNewLabel} = AppState.get()
        AppState.update({showNewLabel: !showNewLabel})
      }
    }
    this.$newLabelButton.addEventListener('click', handleNewLabelButton)

    // click update labels button
    const handleUpdateLabelsButton = async () => {
      if (localState.controller) {
        localState.controller.abort()
      }
      localState.controller = new AbortController()
      try {
        await LabelStore.updateData({signal: localState.controller.signal})
      } catch (err) {
        if (err.name === 'AbortError') {
          return null
        }
      }
    }
    this.$updateLabelButton.addEventListener('click', handleUpdateLabelsButton)

  }

  get $newLabelButton() {
    return this.$targetEl.querySelector(".new-label-button")
  }

  get $updateLabelButton() {
    return this.$targetEl.querySelector(".refresh-labels")
  }

  render() {
    const {activeTab} = AppState.get()
    if (activeTab === TAB.LABEL) super.render()
  }
}


export default LabelTab
