import {selectAll, selectOne} from "../../libs/utils.js";
import {getIssueTpl} from "../../tpl.js";
import {STATUS, TAB} from "../../constants.js";
import View from "../../libs/view.js";


/** Issue Tab */
class IssueTab extends View {
  getTemplate(state) {
    const {activeTab, activeStatus, issues} = state
    const openedIssues = issues?.filter((model) => model.data.status === STATUS.OPEN) || [];
    const closedIssues = issues?.filter((model) => model.data.status === STATUS.CLOSE) || [];
    return getIssueTpl({
      numOpened: openedIssues.length,
      numClosed: closedIssues.length,
      activeStatus: activeStatus,
      show: activeTab === 'issue'
    })
  }

  get $targetEl() {
    return selectOne('#app');
  }

  mountFunction(node) {
    this.$targetEl.innerHTML = ''
    return super.mountFunction(node);
  }

  bindEvents() {

    const handleIssueStatus = ({target: {classList}}) => {
      if (classList.contains("active")) return;
      const activeStatus = classList.contains("open-count") ? STATUS.OPEN : STATUS.CLOSE
      this.state.update({...this.state.get(), activeStatus: activeStatus})
    }

    this.$statusTabs.forEach(
      (el) => el.addEventListener("click", handleIssueStatus)
    )
  }

  get $statusTabs() {
    return selectAll("#app .statusTab .cursor-pointer")
  }

  render() {
    const {activeTab} = this.state.get()
    if (activeTab === TAB.ISSUE) super.render()
  }

}

export default IssueTab
