import {getLabelItemsTpl} from "../../tpl.js";
import {Component} from "../Component.js";

export class LabelItems extends Component {
    constructor(rootSelector, labelStore) {
        super({
            rootSelector,
            templateFn: getLabelItemsTpl,
            templateDataFn: (data) => (data),
            bindingStore: labelStore
        });
    }

    render() {
        this._render(this.bindingStore.get())
    }

}
