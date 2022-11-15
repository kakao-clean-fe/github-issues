import {renderLabel} from "./components/label/index.js";
import {renderIssue} from "./components/issue/index.js";
import {COMMON} from "./lib/constants/selector.js";

(() => {

    renderIssue(COMMON.APP)

    document.querySelector('.buttonNav')
        .addEventListener('click', function (event) {
            const tabName = event.target.id
            if (tabName === 'issue') {
                renderIssue(COMMON.APP)
            } else if (tabName === "label") {
                renderLabel(COMMON.APP)
            }
        })
})();