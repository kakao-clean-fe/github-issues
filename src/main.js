import IssueStore from "./stores/issue.js";
import LabelStore from "./stores/label.js";
import Nav from "./components/nav.js";
import {IssueTab} from "./components/issue.js"
import {STATUS, TAB} from "./constants.js";
import AppState from "./libs/state.js";
import {LabelForm, LabelTab} from "./components/label.js";
import {getRandomColorCode} from "./utils.js";

(
  () => {

    /* 초기 상태 정의 */
    const initState = {
      activeTab: TAB.LABEL,
      activeStatus: STATUS.OPEN,
      showNewLabel: false,
      previewLabelColor: getRandomColorCode()
    }
    AppState.update(initState)

    /* Nav event bind */
    new Nav()

    Promise.all([
      IssueStore.getInitialData(),
      LabelStore.getInitialData()
    ])
      .then(() => {
        /* data loading 후 observer를 통해 전체 update */
        AppState.notify()
      })

    /* Issue, Label, LabelForm 생성 -> 생성과 함께 subscribe */
    new IssueTab()
    new LabelTab()
    new LabelForm()
    // notify는 데이터 로딩 후 실행하므로 notify X

  }
)()
