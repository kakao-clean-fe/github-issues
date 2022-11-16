import {LabelForm} from "./LabelForm.js";
import {LabelHeader} from "./LabelHeader.js";
import {LabelItems} from "./LabelItems.js";
import {labelStore} from "../../lib/stores/label.js";
import {LABEL_SELECTOR} from "../../lib/constants/selector.js";

export const renderLabel = (selector) => {
    new LabelForm(selector, labelStore).render()
    new LabelHeader(LABEL_SELECTOR.HEADER, labelStore).render()
    new LabelItems(LABEL_SELECTOR.LIST, labelStore).render()
}