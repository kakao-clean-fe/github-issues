import View from "../../libs/view.js";
import {selectOne} from "../../libs/utils.js";
import {getIssueItemTpl} from "../../tpl.js";
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
    const {activeTab, activeStatus} = this.state.get()
    if (activeTab === TAB.ISSUE && activeStatus === this.data.status) super.render()
  }
}

export default Model
