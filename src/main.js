import IssueStore from "./stores/issue.js";
import LabelStore from "./stores/label.js";
import Nav from "./components/nav.js";
import IssueTab from "./components/issue/tab.js"
import {STATUS, TAB} from "./constants.js";
import {AppState} from "./libs/state.js";
import {getRandomColorCode} from "./libs/utils.js";
import LabelTab from "./components/label/tab.js";
import {worker} from './mocks/browser';


(
  async () => {
    /* worker start */
    worker.start();

    /* 초기 상태 정의 */
    const initState = {
      activeTab: TAB.LABEL,
      activeStatus: STATUS.OPEN,
      showNewLabel: false,
      randomColor: getRandomColorCode()
    }
    AppState.update(initState)

    /* Nav event bind */
    new Nav()

    /* Issue, Label, LabelForm 생성 -> 생성과 함께 subscribe */
    new IssueTab()
    new LabelTab()

    await Promise.all([
      IssueStore.getInitialData(),
      LabelStore.getInitialData()
    ])

    /* data loading 후 observer를 통해 전체 update */
    AppState.notify()
  }
)()
