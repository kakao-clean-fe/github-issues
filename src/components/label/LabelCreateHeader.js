import {Component} from "../Component.js";
import {getNewLabelButton} from "../../tpl.js";
import {selectElement} from "../../lib/utils.js";
import {LABEL_SELECTOR} from "../../lib/constants/selector.js";

export class LabelCreateHeader extends Component {
    constructor(rootSelector) {
        super({
                rootSelector,
                templateFn: getNewLabelButton,
                templateDataFn: () => {
                }
            }
        )
    }

    render() {
        this._render(
            null,
            [this.#addToggleFormEvent(this.#toggleFormEventCallback)]
        )
    }

    #addToggleFormEvent(cb) {
        return function () {
            selectElement(LABEL_SELECTOR.NEW_BUTTON).addEventListener('click', cb)
        }
    }

    #toggleFormEventCallback() {
        selectElement(LABEL_SELECTOR.FORM).classList.toggle(LABEL_SELECTOR.HIDDEN)
    }
}
