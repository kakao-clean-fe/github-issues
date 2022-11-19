import {requestGet, isHexColor, removeItem, requestPost} from "../utils.js";
import AppState from "../libs/state.js";
import LabelItem from "../components/label/model.js";


const asLabelModel = (data, notify) => {
  AppState.get().labels?.forEach(label => AppState.unsubscribe(label))
  AppState.update({labels: data.map(item => new LabelItem(item))}, notify)
}

/* Label Store를 object literal로 정의합니다. */
const LabelStore = {
  async getInitialData(options) {
    const res = await requestGet("/labels", options)
    return asLabelModel(res, false)
  },
  async updateData(options) {
    const res = await requestGet("/labels-delay", options)
    return asLabelModel(res, true)
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
  addData(item) {
    return requestPost(
      "/labels",
      {
        body: JSON.stringify(item)
      }
    ).then((res) => {
      if (res.status === 201) {
        console.log("Creating Label: Success", item.name)
      }
    }).catch((err) => {
      if (err.status === 500) {
        console.error("Creating Label: Failed")
        alert("Label이 생성되지 않았습니다. 다시 시도해주세요")
      }
    })
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
