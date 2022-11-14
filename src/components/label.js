import {getRandomColor, isHexColor, selectOne} from "../utils.js";
import {getLabelFormTpl, getLabelItemTpl, getLabelTpl} from "../tpl.js";
import {TAB} from "../constants.js";
import Observer from "../libs/observer.js";
import AppState from "../libs/state.js";
import LabelStore from "../stores/label.js";


export class Label extends Observer {
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


export class LabelModel extends Observer {
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

  render() {
    const {activeTab} = AppState.get()
    if (activeTab === TAB.LABEL) super.render()
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
}


export class LabelForm extends Observer {
  get $targetEl() {
    return selectOne('#label-wrapper')
  }

  mountFunction(node) {
    this.$targetEl.insertBefore(node, selectOne("#labels-wrapper"))
  }

  getTemplate(state) {
    const {showNewLabel, previewLabelColor} = state
    return getLabelFormTpl({
      previewLabelColor: previewLabelColor,
      showNewLabel: showNewLabel
    })
  }

  bindEvents() {
    const {
      resetColorButton,
      labelPreview,
      labelColorInput,
      labelNameInput,
      labelDescInput,
      labelCreateButton,
      labelCancelButton
    } = this.$

    const changeColorCode = (colorCode) => {
      labelPreview.style = `background-color: #${colorCode}`
      resetColorButton.style = `background-color: #${colorCode}`
      labelColorInput.value = `#${colorCode}`
    }

    // click reset color button
    resetColorButton.addEventListener('click', () => {
      changeColorCode(getRandomColor())
    })

    labelColorInput.addEventListener('input', (e) => {
      const value = e.target.value
      if (isHexColor(value)) {
        changeColorCode(value.slice(1))
      }
    })

    const handleInputs = () => {
      if (labelNameInput.value && labelDescInput.value) {
        labelCreateButton.classList.remove("opacity-50")
        labelCreateButton.disabled = false
      } else {
        labelCreateButton.classList.add("opacity-50")
        labelCreateButton.disabled = true
      }
    }

    labelNameInput.addEventListener('input', handleInputs)
    labelDescInput.addEventListener('input', handleInputs)

    labelCreateButton.addEventListener('click', (e) => {
      e.preventDefault()
      const item = {
        name: labelNameInput.value,
        description: labelDescInput.value,
        color: labelColorInput.value.slice(1)
      }

      if (LabelStore.isValid(item)) {
        AppState.update({previewLabelColor: getRandomColor()}, false)
        LabelStore.add(item)
      }
    })
    labelCancelButton.addEventListener('click', () => {
      AppState.update({showNewLabel: false})
    })
  }

  get $() {
    const querySelector = (selector) => this.contents?.querySelector(selector)
    return {
      newLabelButton: querySelector(".new-label-button"),
      resetColorButton: querySelector("#new-label-color"),
      labelNameInput: querySelector("#label-name-input"),
      labelDescInput: querySelector("#label-description-input"),
      labelColorInput: querySelector("#label-color-value"),
      labelPreview: querySelector("#label-preview"),
      labelCreateButton: querySelector('#label-create-button'),
      labelCancelButton: querySelector('#label-cancel-button')
    }
  }

  render() {
    const {showNewLabel} = AppState.get()
    if (showNewLabel) {
      super.render();
    }
  }
}
