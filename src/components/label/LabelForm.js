import {getLabelForm, getLabelTpl} from "../../tpl.js";
import {selectElement, selectElementById} from "../../lib/utils.js";
import {LABEL_SELECTOR} from "../../lib/constants/selector.js";
import {Component} from "./Component.js";


export class LabelForm extends Component {
    constructor(rootSelector, labelStore) {
        super({
                rootSelector,
                templateFn: getLabelForm,
                templateDataFn: function () {
                },
                labelStore
            }
        )
    }

    render() {
        this._render()
        this.addLabelCreateEvent(this.labelStore)
        this.addToggleFormEvent()
    }

    addLabelCreateEvent(labelStore) {
        selectElementById(LABEL_SELECTOR.CREATE_BUTTON).addEventListener("click", function () {
            labelStore.add({
                name: selectElementById(LABEL_SELECTOR.NAME_INPUT).value,
                color: selectElementById(LABEL_SELECTOR.COLOR_INPUT).value,
                description: selectElementById(LABEL_SELECTOR.DESCRIPTION_INPUT).value
            })
        })
    }

    addToggleFormEvent() {
        selectElement(LABEL_SELECTOR.NEW_BUTTON).addEventListener('click', function () {
            selectElement(LABEL_SELECTOR.FORM).classList.toggle(LABEL_SELECTOR.HIDDEN)
        })
    }
}


