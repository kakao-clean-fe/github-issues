import {getIssueTpl} from "../../tpl.js";
import {Component} from "../Component.js";
import {selectElement} from "../../lib/utils.js";
import {ISSUE_SELECTOR} from "../../lib/constants/selector.js";
import {ISSUE_STATUS} from "../../lib/constants/common.js";

export class IssueHeader extends Component {
    constructor(rootSelector, issueStore, issueStatusStore) {
        super({
                rootSelector,
                templateFn: getIssueTpl,
                templateDataFn: (issues) => ({
                    openItemsCount: issues.filter((issue) => issue.status === ISSUE_STATUS.OPEN).length,
                    closedItemsCount: issues.filter((issue) => issue.status === ISSUE_STATUS.CLOSE).length
                }),
                bindingStore: issueStore,
            }
        )
        this.issueStatusStore = issueStatusStore
    }

    render() {
        this._render(
            this.bindingStore.get(),
            [this.#addSelectStatusEvent(this.#selectStatusEventCallback(this.issueStatusStore))]
        )
    }

    #addSelectStatusEvent(cb) {
        return function () {
            selectElement(ISSUE_SELECTOR.STATUS_TAB).addEventListener("click", cb)
        }
    }

    #selectStatusEventCallback(issueStatusStore) {
        return function (event) {
            const targetClassList = event.target.classList
            const isOpen = targetClassList.contains(ISSUE_SELECTOR.OPEN_TAB)
            Array.from(this.children).forEach(
                (child) => child.classList.remove(ISSUE_SELECTOR.BOLD_FONT)
            )
            targetClassList.add(ISSUE_SELECTOR.BOLD_FONT);
            issueStatusStore.set(isOpen ? ISSUE_STATUS.OPEN : ISSUE_STATUS.CLOSE)
        };
    }

}

