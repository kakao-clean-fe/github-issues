import {LabelForm} from "./components/label/labelForm.js";
import {COMPONENT_KEY} from "./consts/key.js";
import {SELECTOR} from "./consts/selector.js";
import {useAtomValue, useSetAtomListener} from "./store/atomHooks.js";
import {isLabelLayoutInit} from "./store/atom.js";

const getIsLabelLayoutInit = useAtomValue(isLabelLayoutInit);
const setIsLabelLayoutListener = useSetAtomListener(isLabelLayoutInit);

let labelForm;

export const onIsLabelLayoutTrue = () => {
    if (getIsLabelLayoutInit()) {
        if (!labelForm) labelForm = new LabelForm(COMPONENT_KEY.LABEL_FORM, {}, SELECTOR.LABEL_WRAPPER);
        labelForm.render();
    }
}

setIsLabelLayoutListener(onIsLabelLayoutTrue)