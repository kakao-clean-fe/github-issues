import View from "../../libs/view.js";
import {getRandomColorCode, isHexColor, selectOne} from "../../libs/utils.js";
import {getLabelFormTpl} from "../../tpl.js";
import LabelStore from "../../stores/label.js";
import {AppState} from "../../libs/state.js";

class LabelForm extends View {
  get $targetEl() {
    return selectOne('#label-wrapper')
  }

  mountFunction(node) {
    this.$targetEl.insertBefore(node, selectOne("#labels-wrapper"))
  }

  getTemplate(state) {
    const {showNewLabel, randomColor} = state
    return getLabelFormTpl({
      randomColor: randomColor,
      showNewLabel: showNewLabel,
      lastInputs: this.lastInputs
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

    // onClick reset color button
    resetColorButton.addEventListener('click', () => {
      changeColorCode(getRandomColorCode())
      this.saveInputs()
    })

    // color input 입력시 hexColor이면 preview color 수정
    labelColorInput.addEventListener('input', ({target: {value}}) => {
      isHexColor(value) && changeColorCode(value.slice(1))
      this.saveInputs()
    })

    // input validation을 체크하여 create-button을 활성화/비활성화
    const handleInputs = () => {
      if (labelNameInput.value && labelDescInput.value) {
        labelCreateButton.classList.remove("opacity-50")
        labelCreateButton.disabled = false
      } else {
        labelCreateButton.classList.add("opacity-50")
        labelCreateButton.disabled = true
      }
      this.saveInputs()
    }
    labelNameInput.addEventListener('input', handleInputs)
    labelDescInput.addEventListener('input', handleInputs)

    // create button 클릭시 store에 LabelModel을 추가
    const handleCreateLabel = async (e) => {
      e.preventDefault()
      const item = {
        name: labelNameInput.value,
        description: labelDescInput.value,
        color: labelColorInput.value.slice(1)
      }

      if (LabelStore.isValid(item)) {
        await LabelStore.add(item)
        this.state.update({
          previewLabelColor: getRandomColorCode(),
          showNewLabel: false
        }, true)
      }
    }
    labelCreateButton.addEventListener('click', handleCreateLabel)

    // cancel 버튼 클릭시 Form 숨김
    labelCancelButton.addEventListener('click', () => {
      this.state.update({showNewLabel: false})
    })
  }

  get $() {
    const querySelector = (selector) => this.contents?.querySelector(selector)
    return {
      resetColorButton: querySelector("#new-label-color"),
      labelNameInput: querySelector("#label-name-input"),
      labelDescInput: querySelector("#label-description-input"),
      labelColorInput: querySelector("#label-color-value"),
      labelPreview: querySelector("#label-preview"),
      labelCreateButton: querySelector('#label-create-button'),
      labelCancelButton: querySelector('#label-cancel-button')
    }
  }

  saveInputs() {
    const {labelNameInput, labelDescInput, labelColorInput} = this.$
    localStorage.setItem("name", labelNameInput.value)
    localStorage.setItem("description", labelDescInput.value)
    localStorage.setItem("color", labelColorInput.value.slice(1))
  }

  get lastInputs() {
    return {
      name: localStorage.getItem("name"),
      description: localStorage.getItem("description"),
      color: localStorage.getItem("color")
    }
  }

  render() {
    const {showNewLabel} = this.state.get()
    if (showNewLabel) {
      super.render();
    }
  }
}

export default LabelForm
