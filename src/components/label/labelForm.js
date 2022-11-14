import {Component} from "../component.js";
import {getLabelFormTpl} from "../../tpl.js";
import {labelsAtom} from "../../store/atom.js";
import {useAtom} from "../../store/atomHooks.js";

const [getLabels, setLabels] = useAtom(labelsAtom);

export class LabelForm extends Component {
    constructor(key, props, parentSelector) {
        super(key, props, parentSelector);
        this._selector = '#new-label-form';
        this._afterMountEvent = this.#addEventToCreateBtn.bind(this);
    }

    render() {
        const content = getLabelFormTpl();
        super.render(content, 'replace');
    }

    #addEventToCreateBtn() {
        const createBtnElem = document.querySelector('#label-create-button');
        if(!createBtnElem) throw Error('LabelForm createBtn not exists!');
        createBtnElem.addEventListener('click', this.#onClickCreateBtn.bind(this));
    }

    #onClickCreateBtn() {
        const name = document.querySelector('#label-name-input');
        const description = document.querySelector('#label-description-input');
        const color = document.querySelector('#label-color-value');
        const newData = {name: name.value, color: color.value, description: description.value};
        setLabels([...getLabels(), newData]);
        [name, description, color].forEach((e) => e.value = '');
    }
}