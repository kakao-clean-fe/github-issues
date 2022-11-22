import {getLabelForm} from "../../tpl.js";
import {selectElement, selectElementById} from "../../lib/utils.js";
import {LABEL_SELECTOR} from "../../lib/constants/selector.js";
import {Component} from "../Component.js";


export class LabelForm extends Component {
    constructor(rootSelector, labelStore) {
        super({
                rootSelector,
                templateFn: getLabelForm,
                templateDataFn: () => {
                }
            }
        )
        this.labelStore = labelStore

    }

    render() {
        this._render(
            null,
            [
                this.#addLabelCreateEvent(this.#labelCreateEventCallback(this.labelStore)),
                this.#addToggleFormEvent(this.#toggleFormEventCallback)
            ]
        )
    }

    #addLabelCreateEvent(cb) {
        return function () {
            selectElementById(LABEL_SELECTOR.CREATE_BUTTON).addEventListener("click", cb)
        }
    }

    #labelCreateEventCallback(labelStore) {
        return function () {
            labelStore.add({
                name: selectElementById(LABEL_SELECTOR.NAME_INPUT).value,
                color: selectElementById(LABEL_SELECTOR.COLOR_INPUT).value,
                description: selectElementById(LABEL_SELECTOR.DESCRIPTION_INPUT).value
            })
        }
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


