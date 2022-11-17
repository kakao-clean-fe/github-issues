import {LabelForm} from "./LabelForm.js";
import {LabelHeader} from "./LabelHeader.js";
import {LabelItems} from "./LabelItems.js";
import {LABEL_SELECTOR} from "../../lib/constants/selector.js";
import {labelStore} from "../../lib/stores/label.js";
import {get} from "../../lib/api.js";

export const renderLabel = (selector) => {
    getInitialData("/data-sources/labels.json")
    new LabelForm(selector, labelStore).render()
    new LabelHeader(LABEL_SELECTOR.HEADER, labelStore).render()
    new LabelItems(LABEL_SELECTOR.LIST, labelStore).render()
}

const getInitialData = (url) => {
    get(url).then(data => labelStore.add(...data))
}