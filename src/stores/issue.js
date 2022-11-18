import {getRequest, removeItem} from "../utils.js";
import AppState from "../libs/state.js";
import IssueModel from "../components/issue/model.js";

const IssueStore = {
  getInitialData() {
    return getRequest("/issues")
      .then(
        (data) => {
          AppState.update({issues: data.map((item) => new IssueModel(item))}, false)
        }
      )
  },
  add(item) {
    const {labels} = AppState.get()
    AppState.update(
      {
        labels: [
          ...labels,
          new IssueModel(item)
        ]
      }
    )
  },
  remove(item) {
    const {labels} = AppState.get()
    const newLabels = removeItem(labels, (label) => label.data.name === item.data.name)
    AppState.update({labels: newLabels})
  }
}


export default IssueStore
