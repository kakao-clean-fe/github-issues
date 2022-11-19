import {requestGet, removeItem} from "../utils.js";
import AppState from "../libs/state.js";
import IssueItem from "../components/issue/model.js";
import LabelItem from "../components/label/model.js";


const asLabelModel = (data, notify) => {
  AppState.get().issues?.forEach(label => AppState.unsubscribe(label))
  AppState.update({issues: data.map(item => new IssueItem(item))}, notify)
}

const IssueStore = {
  getInitialData() {
    return requestGet("/issues").then(asLabelModel)
  },
  add(item) {
    const {labels} = AppState.get()
    AppState.update(
      {
        labels: [
          ...labels,
          new IssueItem(item)
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
