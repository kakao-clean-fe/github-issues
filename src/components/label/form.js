import View from "../../libs/view.js";
import {getRandomColorCode, isHexColor, selectOne} from "../../utils.js";
import {getLabelFormTpl} from "../../tpl.js";
import LabelStore from "../../stores/label.js";
import AppState from "../../libs/state.js";

class LabelForm extends View {
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

    // onClick reset color button
    resetColorButton.addEventListener('click', () => {
      changeColorCode(getRandomColorCode())
    })

    // color input 입력시 hexColor이면 preview color 수정
    labelColorInput.addEventListener('input', ({target: {value}}) => {
      isHexColor(value) && changeColorCode(value.slice(1))
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
    }
    labelNameInput.addEventListener('input', handleInputs)
    labelDescInput.addEventListener('input', handleInputs)

    // create button 클릭시 store에 LabelModel을 추가
    const handleCreateLabel = (e) => {
      e.preventDefault()
      const item = {
        name: labelNameInput.value,
        description: labelDescInput.value,
        color: labelColorInput.value.slice(1)
      }

      if (LabelStore.isValid(item)) {
        AppState.update({previewLabelColor: getRandomColorCode()}, false)
        LabelStore.add(item)
      }
    }
    labelCreateButton.addEventListener('click', handleCreateLabel)

    // cancel 버튼 클릭시 Form 숨김
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

export default LabelForm
