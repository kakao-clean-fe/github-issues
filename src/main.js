import {renderLabel} from "./components/label/index.js";
import {renderIssue} from "./components/issue/index.js";
import {COMMON_SELECTOR} from "./lib/constants/selector.js";
import {selectElement} from "./lib/utils.js";
import {worker} from "./lib/mocks/browser.js";

function selectNavTab(event) {
    const tabName = event.target.id
    if (tabName === 'issue') {
        renderIssue(COMMON_SELECTOR.APP)
    } else if (tabName === "label") {
        renderLabel(COMMON_SELECTOR.APP)
    }
}

(() => {
    worker.start().then(() => {
            renderIssue(COMMON_SELECTOR.APP)
            selectElement(COMMON_SELECTOR.NAV_TAB)
                .addEventListener('click', selectNavTab)
        }
    )
})();