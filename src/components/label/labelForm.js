import {Component} from "../component.js";
import {getLabelFormTpl} from "../../tpl.js";
import {labelsAtom} from "../../store/atom.js";
import {useAtom} from "../../store/atomHooks.js";
import {RENDER_TYPE} from "../../consts/const.js";
import {SELECTOR} from "../../consts/selector.js";

const [getLabels, setLabels] = useAtom(labelsAtom);

export class LabelForm extends Component {
    constructor(key, props, parentSelector) {
        super(key, props, parentSelector);
        this._selector = SELECTOR.LABEL_FORM;
        this._afterMountEvent = this.#addEventToCreateBtn.bind(this);
    }

    render() {
        const content = getLabelFormTpl();
        super.render(content, RENDER_TYPE.REPLACE);
    }

    #addEventToCreateBtn() {
        const createBtnElem = document.querySelector(SELECTOR.LABEL_CREATE_BUTTON);
        if(!createBtnElem) throw Error('LabelForm createBtn not exists!');
        createBtnElem.addEventListener('click', this.#onClickCreateBtn.bind(this));
    }

    #onClickCreateBtn() {
        const name = document.querySelector(SELECTOR.LABEL_FORM_NAME);
        const description = document.querySelector(SELECTOR.LABEL_FORM_DESCRIPTION);
        const color = document.querySelector(SELECTOR.LABEL_FORM_COLOR);
        const newData = {name: name.value, color: color.value, description: description.value};
        setLabels([...getLabels(), newData]);
        [name, description, color].forEach((e) => e.value = '');
    }
}