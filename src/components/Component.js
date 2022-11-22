import {selectElement} from "../lib/utils.js";

export class Component {
    constructor({rootSelector, templateFn, templateDataFn = () => {}, bindingStore}) {
        this.rootSelector = rootSelector
        this.templateFn = templateFn
        this.templateDataFn = templateDataFn
        this.bindingStore = bindingStore
    }

    _render(data, events = []) {
        this.events = events
        this.#render(data)
        this.#bind()
    }

    #render(data) {
        selectElement(this.rootSelector).innerHTML = this.templateFn(this.templateDataFn(data))
        this.events.forEach((event) => event())
    }

    #bind() {
        this.bindingStore?.subscribe((data) => this.#render(data))
    }
}