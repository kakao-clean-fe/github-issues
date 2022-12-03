import {client, removeItem} from "../libs/utils.js";
import {AppState} from "../libs/state.js";
import IssueItem from "../components/issue/model.js";


const asIssueModel = (data, notify) => {
  (
    AppState.get()
      .issues
      ?.forEach(issue => AppState.unsubscribe(issue))
  )
  AppState.update(
    {issues: data.map(item => new IssueItem(item))},
    notify
  )
}

const IssueStore = {
  async getInitialData() {
    const {data} = await client("GET")("/issues")
    return asIssueModel(await data, false)
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
