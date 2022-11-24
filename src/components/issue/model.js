import View from "../../libs/view.js";
import {selectOne} from "../../utils.js";
import {getIssueItemTpl} from "../../tpl.js";
import AppState from "../../libs/state.js";
import {TAB} from "../../constants.js";

class Model extends View {
  constructor(item = {}) {
    super();
    this.data = item
  }

  get $targetEl() {
    return selectOne('#app .issue-list ul')
  }

  getTemplate(state) {
    return getIssueItemTpl(this.data)
  }

  render() {
    const {activeTab, activeStatus} = AppState.get()
    if (activeTab === TAB.ISSUE && activeStatus === this.data.status) super.render()
  }
}

export default Model
