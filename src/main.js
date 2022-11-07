import { groupBy } from "./lib/utils.js";
import IssueItems from "./lib/components/IssueItems.js";
import IssueHeader from "./lib/components/IssueHeader.js";
import { ISSUE_STATUS } from "./lib/constants/common.js";
import {
    BOLD_FONT_SELECTOR,
    CLOSE_TAB_SELECTOR,
    ISSUE_LIST_SELECTOR,
    OPEN_TAB_SELECTOR,
} from "./lib/constants/selector.js";
import { get } from "./lib/api.js";

class Main {
    render(baseElement) {
        return function (data) {
            let renderIssueHeader = new IssueHeader().render(baseElement);
            renderIssueHeader(
                data[ISSUE_STATUS.OPEN].length,
                data[ISSUE_STATUS.CLOSE].length
            );
            let renderIssueItems = new IssueItems().render(
                baseElement.querySelector(ISSUE_LIST_SELECTOR)
            );
            renderIssueItems(data[ISSUE_STATUS.OPEN]);

            const addEventListener = (status) => {
                const tabElements = {
                    [ISSUE_STATUS.OPEN]: baseElement.querySelector(OPEN_TAB_SELECTOR),
                    [ISSUE_STATUS.CLOSE]: baseElement.querySelector(CLOSE_TAB_SELECTOR),
                };
                tabElements[status].onclick = function () {
                    this.classList.add(BOLD_FONT_SELECTOR);
                    tabElements[
                        Object.keys(tabElements).find((key) => key !== status)
                        ].classList.remove("font-bold");
                    renderIssueItems(data[status]);
                };
            };
            addEventListener(ISSUE_STATUS.OPEN);
            addEventListener(ISSUE_STATUS.CLOSE);
        };
    }
}

const main = new Main().render(document.getElementById("app"));
const data = groupBy(await get("/data-sources/issues.json"), "status");
main(data);
