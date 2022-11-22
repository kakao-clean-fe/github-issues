import {LabelForm} from "./LabelForm.js";
import {LabelHeader} from "./LabelHeader.js";
import {LabelItems} from "./LabelItems.js";
import {LABEL_SELECTOR} from "../../lib/constants/selector.js";
import {labelStore} from "../../stores/label.js";
import {get} from "../../lib/api.js";
import {LabelCreateHeader} from "./LabelCreateHeader.js";

export const renderLabel = (selector) => {
    getInitialData("/labels")
    new LabelCreateHeader(selector).render()
    // import("./LabelForm.js").then(
    //     ({LabelForm}) => {
    //         new LabelForm('.label-form', labelStore).render()
    //     }
    // )
    new LabelForm(LABEL_SELECTOR.LABEL_FORM, labelStore).render()
    new LabelHeader(LABEL_SELECTOR.HEADER, labelStore).render()
    new LabelItems(LABEL_SELECTOR.LIST, labelStore).render()
}

const getInitialData = (url) => {
    get({url}).then(data => labelStore.set(...data))
}