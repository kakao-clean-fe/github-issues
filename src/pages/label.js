import {getLabelTpl} from "../tpl.js";
import {Component} from "../components/component.js";
import {LabelItem} from "../components/label/labelItem.js";
import {fetchLabelData} from "../utils/fetch.js";
import {useAtomValue, useSetAtomListener, useSetAtomValue} from "../store/atomHooks.js";
import {labelsAtom} from "../store/atom.js";
import {LabelForm} from "../components/label/labelForm.js";
import {pipe} from "../utils/functional.js";

const setLabels = useSetAtomValue(labelsAtom);
const getLabels = useAtomValue(labelsAtom);
const setLabelsListener = useSetAtomListener(labelsAtom);

export class LabelPage extends Component {
    constructor(props, parentSelector) {
        super('label-page', props, parentSelector);
        this._mountEvent = this.#initLabels.bind(this);
        this._afterMountEvent = pipe(this.#addEventToNewLabelBtn, this.#updateLabelsCount.bind(this));
        setLabelsListener(pipe(this.#updateChildAndLabelsCount.bind(this), this._renderChild.bind(this, ['label-form'], true)));
    }

    render() {
        let renderContent = getLabelTpl();
        super.render(renderContent, 'override');
    }

    #addEventToNewLabelBtn() {
        document.querySelector('.new-label-button')?.addEventListener('click', () => {
            document.querySelector('#new-label-form').classList.toggle('hidden');
        });
    }

    #updateChildAndLabelsCount() {
        if(!this._isMounted) return; // mount가 안된 상태에서는 dom 접근 불가능하기 때문
        this.#updateChild();
        this.#updateLabelsCount();
    }

    #updateChild(){
        const newLabels = getLabels();
        this._appendChild(new LabelItem(`label-item-${this._index++}`, newLabels[newLabels.length-1], '.label-list'));
    }

    #updateLabelsCount(){
        document.querySelector('#labels-count').textContent = `${getLabels().length} Labels`;
    }

    async #initLabels() {
        setLabels(await fetchLabelData());
        this._initChild(this.#initChild());
    }

    #initChild() {
        const labelForm = new LabelForm('label-form', {}, '#label-wrapper');
        const labelItems = getLabels().map((label) => new LabelItem(`label-item-${this._index++}`, label, '.label-list'));
        return [labelForm, ...labelItems];
    }
}