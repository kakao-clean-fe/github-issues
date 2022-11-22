import {Component} from "../Component.js";
import {getNewLabelButton} from "../../tpl.js";
import {selectElement} from "../../lib/utils.js";
import {LABEL_SELECTOR} from "../../lib/constants/selector.js";

export class LabelCreateHeader extends Component {
    isLabelFormExist = false

    constructor(rootSelector, labelStore) {
        super({
                rootSelector,
                templateFn: getNewLabelButton,
                templateDataFn: () => {
                }
            }
        )
        this.labelStore = labelStore
    }

    render() {
        this._render(
            null,
            [this.#addToggleFormEvent(this.#toggleFormEventCallback.bind(this))]
        )
    }

    #addToggleFormEvent(cb) {
        return function () {
            selectElement(LABEL_SELECTOR.NEW_BUTTON).addEventListener('click', cb)
        }
    }

    async #toggleFormEventCallback() {
        if (!this.isLabelFormExist) {
            const {LabelForm} = await import("./LabelForm.js")
            new LabelForm(LABEL_SELECTOR.LABEL_FORM, this.labelStore).render()
            this.isLabelFormExist = true
        }
        selectElement(LABEL_SELECTOR.FORM).classList.toggle(LABEL_SELECTOR.HIDDEN)
    }
}
