import {Component} from "../component.js";
import {getLabelItemTpl} from "../../tpl.js";
import {RENDER_TYPE} from "../../consts/const.js";
import {pipe} from "../../utils/functional.js";
import {useAtom} from "../../store/atomHooks.js";
import {labelsAtom} from "../../store/atom.js";

const [getLabels, setLabels] = useAtom(labelsAtom);

export class LabelItem extends Component {
    constructor(key, props, parentSelector) {
        super(key, props, parentSelector);
        this._afterMountEvent = pipe(this.#addEventToDeleteBtn.bind(this));
    }

    render() {
        const content = getLabelItemTpl({...this._props, id: this._key});
        super.render(content, RENDER_TYPE.ADD);
    }

    #addEventToDeleteBtn() {
        document.querySelector(`#${this._key} .delete-button`).addEventListener('click', () => {
            const textContent = document.querySelector(`#${this._key} #label-name`).textContent;
            const labels = getLabels();
            // TODO: 모든 label 제거 후 다시 그리지 않도록 최적화
            this._removeChild(this._parentSelector);
            setLabels(labels.filter((label) => label.name !== textContent));
        })
    }
}