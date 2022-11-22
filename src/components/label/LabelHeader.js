import {getLabelTpl} from "../../tpl.js";
import {Component} from "../Component.js";
import {selectElement} from "../../lib/utils.js";
import {abort, handle} from "../../lib/api.js";
import {LABEL_SELECTOR} from "../../lib/constants/selector.js";

export class LabelHeader extends Component {
    constructor(rootSelector, labelStore) {
        super({
            rootSelector,
            templateFn: getLabelTpl,
            templateDataFn: (data) => data.length,
            bindingStore: labelStore
        });
    }

    render() {
        this._render(
            this.bindingStore.get(),
            [this.#addClickUpdateButtonEvent(this.#clickUpdateButtonCallback.bind(this))]
        )
    }

    #addClickUpdateButtonEvent(cb) {
        return function () {
            selectElement(LABEL_SELECTOR.REFRESH).addEventListener("click", cb)
        }
    }


    async #clickUpdateButtonCallback() {
        const {error, response} = await handle(abort('/labels-delay'))
        error ? console.error(error) : this.bindingStore.set(...response)
    }

}

