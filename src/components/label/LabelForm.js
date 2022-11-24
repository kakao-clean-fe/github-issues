import {getLabelForm} from "../../tpl.js";
import {selectElementById} from "../../lib/utils.js";
import {LABEL_SELECTOR} from "../../lib/constants/selector.js";
import {Component} from "../Component.js";
import {handle, post} from "../../lib/api.js";


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
            [this.#addLabelCreateEvent(this.#labelCreateEventCallback.bind(this))]
        )
    }

    #addLabelCreateEvent(cb) {
        return function () {
            selectElementById(LABEL_SELECTOR.CREATE_BUTTON).addEventListener("click", cb)
        }
    }

    async #labelCreateEventCallback() {
        const data = {
            name: selectElementById(LABEL_SELECTOR.NAME_INPUT).value,
            color: selectElementById(LABEL_SELECTOR.COLOR_INPUT).value,
            description: selectElementById(LABEL_SELECTOR.DESCRIPTION_INPUT).value
        }
        const {error, response} = await handle(post({url: "/labels", data}))
        error ? (console.error(error.message), alert(error.message)) : this.labelStore.set(...response)

    }
}


