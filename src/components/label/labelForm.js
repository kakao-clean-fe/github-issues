import {Component} from "../component.js";
import {getLabelFormTpl} from "../../tpl.js";
import {labelsAtom} from "../../store/atom.js";
import {useSetAtomValue} from "../../store/atomHooks.js";
import {RENDER_TYPE} from "../../consts/const.js";
import {SELECTOR} from "../../consts/selector.js";
import {pipe} from "../../utils/functional.js";
import {getRandomColor} from "../../utils/util.js";
import {saveLabels} from "../../utils/fetch.js";

const setLabels = useSetAtomValue(labelsAtom);

export class LabelForm extends Component {
    constructor(key, props, parentSelector) {
        super(key, props, parentSelector);
        this._selector = SELECTOR.LABEL_FORM;
        this._afterMountEvent = pipe(this.#addEventToCreateBtn.bind(this), this.#addEventToColorBtn.bind(this));
    }

    render() {
        const content = getLabelFormTpl();
        super.render(content, RENDER_TYPE.REPLACE);
    }

    #addEventToCreateBtn() {
        const createBtnElem = document.querySelector(SELECTOR.LABEL_CREATE_BUTTON);
        if (!createBtnElem) throw Error('LabelForm createBtn not exists!');
        createBtnElem.addEventListener('click', this.#onClickCreateBtn.bind(this));
    }

    #onClickCreateBtn() {
        const name = document.querySelector(SELECTOR.LABEL_FORM_NAME);
        const description = document.querySelector(SELECTOR.LABEL_FORM_DESCRIPTION);
        const color = document.querySelector(SELECTOR.LABEL_FORM_COLOR);
        const newLabel = {name: name.value, color: color.value.substring(1), description: description.value};
        saveLabels(newLabel).then((result) => {
            result
                .doOnSuccess((res) => setLabels(res.data))
                .doOnError(({data: {error}}) => alert(error))
        });
        [name, description, color].forEach((e) => e.value = '');
    }

    #addEventToColorBtn() {
        const colorBtnElem = document.querySelector(SELECTOR.LABEL_NEW_LABEL_COLOR);
        colorBtnElem.addEventListener('click', this.#onClickColorBtn);
    }

    #onClickColorBtn({target}) {
        const previewElem = document.querySelector(SELECTOR.LABEL_PREVIEW);
        const colorTxtElem = document.querySelector(SELECTOR.LABEL_COLOR_VALUE);
        const randomColor = getRandomColor();
        colorTxtElem.value = randomColor;
        [previewElem, target].forEach((elem) => elem.style.backgroundColor = randomColor);
    }
}