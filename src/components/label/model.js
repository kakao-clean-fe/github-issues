import View from "../../libs/view.js";
import {getRandomColorCode, isHexColor, selectOne} from "../../libs/utils.js";
import {getLabelItemTpl} from "../../tpl.js";
import LabelStore from "../../stores/label.js";
import {ERROR_TYPE, TAB} from "../../constants.js";

class LabelItem extends View {
  constructor(item = {}) {
    super();
    this.data = item
    this.isEditing = false
  }

  get labelId() {
    return this.data.id
  }

  get $targetEl() {
    return selectOne('#app ul.label-list')
  }

  getTemplate(state) {
    return getLabelItemTpl(this.data, this.isEditing)
  }

  bindEvents() {
    const {
      editButton,
      deleteButton,
      resetColorButton,
      labelColorInput,
      labelNameInput,
      labelDescInput,
      labelSaveButton,
      labelCancelButton
    } = this.$

    editButton?.addEventListener('click', () => {
      this.isEditing = !this.isEditing
      this.state.notify()
    })

    deleteButton?.addEventListener('click', () => {
      LabelStore.remove(this.labelId)
    })

    const changeColorCode = (colorCode) => {
      resetColorButton.style = `background-color: #${colorCode}`
      labelColorInput.value = `#${colorCode}`
    }

    // onClick reset color button
    resetColorButton?.addEventListener('click', () => {
      changeColorCode(getRandomColorCode())
    })

    // color input 입력시 hexColor이면 preview color 수정
    labelColorInput?.addEventListener('input', ({target: {value}}) => {
      isHexColor(value) && changeColorCode(value.slice(1))
    })

    // input validation을 체크하여 create-button을 활성화/비활성화
    const handleInputs = () => {
      if (labelNameInput.value && labelDescInput.value) {
        labelSaveButton.classList.remove("opacity-50")
        labelSaveButton.disabled = false
      } else {
        labelSaveButton.classList.add("opacity-50")
        labelSaveButton.disabled = true
      }
    }
    labelNameInput?.addEventListener('input', handleInputs)
    labelDescInput?.addEventListener('input', handleInputs)

    // create button 클릭시 store에 LabelModel을 추가
    const handleSaveLabel = async (e) => {
      e.preventDefault()
      const item = {
        name: labelNameInput.value,
        description: labelDescInput.value,
        color: labelColorInput.value.slice(1)
      }

      if (!LabelStore.isValid(item)) return
      const res = await LabelStore.edit(this.labelId, item)
      if (res) {
        this.isEditing = false
        this.state.notify()
      }
    }
    labelSaveButton?.addEventListener('click', handleSaveLabel)

    // cancel 버튼 클릭시 Form 숨김
    labelCancelButton?.addEventListener('click', () => {
      this.isEditing = false
      this.state.notify()
    })
  }

  get $() {
    const querySelector = (selector) => this.contents?.querySelector(selector)
    const id = this.labelId
    return {
      editButton: querySelector('.edit-button'),
      deleteButton: querySelector('.delete-button'),
      Form: querySelector(`#label-item-form-${id}`),
      resetColorButton: querySelector(`#new-label-color-${id}`),
      labelNameInput: querySelector(`#label-name-input-${id}`),
      labelDescInput: querySelector(`#label-description-input-${id}`),
      labelColorInput: querySelector(`#label-color-value-${id}`),
      labelSaveButton: querySelector(`#label-save-button-${id}`),
      labelCancelButton: querySelector(`#label-cancel-button-${id}`)
    }
  }

  render() {
    const {activeTab} = this.state.get()
    if (activeTab === TAB.LABEL) super.render()
  }
}

export default LabelItem
