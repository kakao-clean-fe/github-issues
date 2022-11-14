import {fetchData, isHexColor, removeItem} from "../utils.js";
import AppState from "../libs/state.js";
import {LabelModel} from "../components/label.js";

/* Label Store를 object literal로 정의합니다. */
const LabelStore = {
  getInitialData() {
    return fetchData("data-sources/labels.json")
      .then(
        (data) => {
          AppState.update({labels: data.map(item => new LabelModel(item))}, false)
        }
      )
  },
  isValid(item) {
    const {labels} = AppState.get()
    if (labels.find(label => label.name === item.name)) {
      alert("같은 이름의 Label이 존재합니다.")
      return false
    }
    if (!isHexColor(`${item.color}`)) {
      alert("잘못된 Color 코드입니다.")
      return false
    }
    return true
  },
  add(item) {
    const {labels} = AppState.get()
    AppState.update(
      {
        labels: [
          ...labels,
          new LabelModel(item)
        ]
      }
    )
  },
  remove(itemModel) {
    const {labels} = AppState.get()
    const newLabels = removeItem(
      labels,
      (label) => label.data.name === itemModel.data.name
    )
    AppState.unsubscribe(itemModel)
    AppState.update({labels: newLabels})
  }
}


export default LabelStore
