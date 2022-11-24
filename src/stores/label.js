import {client, isHexColor} from "../libs/utils.js";
import {AppState} from "../libs/state.js";
import LabelItem from "../components/label/model.js";
import {
  SUCCESS,
  FAILED,
  VALID_FAILED_SAME_LABEL_NAME,
  VALID_FAILED_WRONG_COLOR_CODE,
  UNEXPECTED_ERROR, LABEL_ALREADY_EXISTS, NO_SUCH_LABEL
} from "../msg.js";


const asLabelModel = (data, notify) => {
  AppState.get().labels?.forEach(label => AppState.unsubscribe(label))
  AppState.update({labels: data.map(item => new LabelItem(item))}, notify)
}

/* Label Store를 object literal로 정의합니다. */
const LabelStore = {
  async getInitialData() {
    const {data} = await client("GET")("/labels")
    return asLabelModel(await data, false)
  },
  async updateItems(options) {
    /* /labels-delay -> /labels */
    const {data} = await client("GET")("/labels", options)
    return asLabelModel(await data, true)
  },
  isValid(item) {
    const {labels} = AppState.get()
    if (labels.find(label => label.name === item.name)) {
      alert(VALID_FAILED_SAME_LABEL_NAME)
      return false
    }
    if (!isHexColor(`${item.color}`)) {
      alert(VALID_FAILED_WRONG_COLOR_CODE)
      return false
    }
    return true
  },
  async add(data) {
    const {status} = await client("POST")("/labels", {body: JSON.stringify(data)})
    switch (status) {
      case 409:
        console.error(FAILED)
        alert(NO_SUCH_LABEL)
        return false
      case 500:
        console.error(FAILED)
        alert(UNEXPECTED_ERROR)
        return false
    }
    return true
  },
  async edit(id, data) {
    const {status} = await client("PUT")(`/labels/${id}`, {body: JSON.stringify(data)})
    switch (status) {
      case 400:
        console.error(FAILED)
        alert(NO_SUCH_LABEL)
        return false
      case 409:
        console.error(FAILED)
        alert(LABEL_ALREADY_EXISTS)
        return false
      case 500:
        console.error(FAILED)
        alert(UNEXPECTED_ERROR)
        return false
    }
    return true
  },
  async remove(id) {
    const {status} = await client("DELETE")(`/labels/${id}`)
    switch (status) {
      case 500:
        console.error(FAILED)
        alert(UNEXPECTED_ERROR)
        return false
    }
    return true
  }
}


export default LabelStore
