import {selectElement} from "../../lib/utils.js";

export class Component {
    constructor({rootSelector, templateFn, templateDataFn, labelStore}) {
        this.rootSelector = rootSelector
        this.templateFn = templateFn
        this.templateDataFn = templateDataFn
        this.labelStore = labelStore

    }

    _render(data) {
        selectElement(this.rootSelector).innerHTML = this.templateFn(this.templateDataFn(data))
    }

    bind() {
        this.labelStore.subscribe((labels) => this._render(labels))
    }
}