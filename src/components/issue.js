import {selectAll, selectOne} from "../utils.js";
import {getIssueItemTpl, getIssueTpl, getLabelItemTpl} from "../tpl.js";
import {STATUS, TAB} from "../constants.js";
import Observer from "../libs/observer.js";
import AppState from "../libs/state.js";


export class Issue extends Observer {
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
    selectAll("#app .statusTab .cursor-pointer")
      .forEach(
        (el) => {
          el.addEventListener(
            "click",
            (e) => {
              const {classList} = e.target
              if (classList.contains("active")) return;
              const activeStatus = classList.contains("open-count") ? STATUS.OPEN : STATUS.CLOSE
              AppState.update({...AppState.get(), activeStatus: activeStatus})
            }
          )
        }
      )
  }

  render() {
    const {activeTab} = AppState.get()
    if (activeTab === TAB.ISSUE) super.render()
  }

}

export class IssueModel extends Observer {
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

  bindEvents() {
  }

  get $() {
    const querySelector = (selector) => this.contents?.querySelector(selector)
    return {
      editButton: querySelector('.edit-button'),
      deleteButton: querySelector('.delete-button'),
    }
  }
}
