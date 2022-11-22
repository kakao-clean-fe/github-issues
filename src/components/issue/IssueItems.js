import {getIssueItemsTpl} from "../../tpl.js";
import {Component} from "../Component.js";

export class IssueItems extends Component {
    constructor(rootSelector, selectedIssueStore) {
        super({
                rootSelector,
                templateFn: getIssueItemsTpl,
                templateDataFn: (data) => (data),
                bindingStore: selectedIssueStore
            }
        )
    }

    render() {
        this._render(this.bindingStore.get())
    }
}

