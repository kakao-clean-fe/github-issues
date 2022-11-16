import {getLabelItemsTpl} from "../../tpl.js";
import {selectElement, selectElementById} from "../../lib/utils.js";

export class Component {
    constructor({rootSelector, templateFn, templateDataFn}) {
        this.rootSelector = rootSelector
        this.templateFn = templateFn
        this.templateDataFn = templateDataFn

    }

    _render(data) {
        selectElement(this.rootSelector).innerHTML = this.templateFn(this.templateDataFn(data))
    }

    bind(labelStore) {
        labelStore.subscribe((labels) => this._render(labels))
    }
}