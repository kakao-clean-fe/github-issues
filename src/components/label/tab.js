import {selectOne} from "../../libs/utils.js";
import {getLabelTpl} from "../../tpl.js";
import {TAB} from "../../constants.js";
import View from "../../libs/view.js";
import {AppState} from "../../libs/state.js";
import LabelStore from "../../stores/label.js";


class LabelTab extends View {
  constructor() {
    super();
    this.controller = undefined
    this.isFormImported = false
    this.isSearchResult = false
  }

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
      isSearchResult: this.isSearchResult
    })
  }

  bindEvents() {
    const {
      clearSearchButton,
      searchInput,
      newLabelButton,
      updateLabelButton,
    } = this.$

    // toggle new label button
    const handleNewLabelButton = async () => {
      if (this.isFormImported) {
        const {showNewLabel} = this.state.get()
        this.state.update({showNewLabel: !showNewLabel})
      } else {
        const {default: LabelForm} = await import("./form.js")
        this.isFormImported = true
        new LabelForm()
        const {showNewLabel} = this.state.get()
        this.state.update({showNewLabel: !showNewLabel})
      }
    }
    newLabelButton.addEventListener('click', handleNewLabelButton)

    // click update labels button
    const handleUpdateLabels = async () => {
      if (this.controller) {
        this.controller.abort()
      }
      this.controller = new AbortController()
      try {
        if (searchInput.value) this.isSearchResult = true
        await LabelStore.updateItems(
          {
            signal: this.controller.signal,
            params: {
              search: searchInput.value
            }
          }
        )
      } catch (err) {
        if (err.name === 'AbortError') {
          return null
        }
      }
    }
    updateLabelButton.addEventListener('click', handleUpdateLabels)

    // search filter
    const handleEnter = async ({which}) => {
      if (which === 13) {
        await handleUpdateLabels()
      }
    }
    searchInput.addEventListener('keypress', handleEnter)

    clearSearchButton?.addEventListener('click', async () => {
      this.isSearchResult = false
      await handleUpdateLabels()
    })
  }

  get $() {
    const querySelector = (selector) => this.contents?.querySelector(selector)
    return {
      clearSearchButton: querySelector(".issues-reset-query"),
      searchInput: querySelector("#filter-input"),
      newLabelButton: querySelector(".new-label-button"),
      updateLabelButton: querySelector(".refresh-labels")
    }
  }

  render() {
    const {activeTab} = this.state.get()
    if (activeTab === TAB.LABEL) super.render()
  }
}


export default LabelTab
