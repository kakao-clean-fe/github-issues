import {getLabelTpl} from "../tpl.js";
import {Component} from "../components/component.js";
import {LabelItem} from "../components/label/labelItem.js";
import {fetchLabelData} from "../utils/fetch.js";
import {useAtom, useSetAtomListener, useSetAtomValue} from "../store/atomHooks.js";
import {isLabelLayoutInit, labelsAtom} from "../store/atom.js";
import {pipe} from "../utils/functional.js";
import {RENDER_TYPE} from "../consts/const.js";
import {STYLE} from "../consts/style.js";
import {SELECTOR} from "../consts/selector.js";
import {COMPONENT_KEY} from "../consts/key.js";

const [getLabels, setLabels] = useAtom(labelsAtom);
const setLabelsListener = useSetAtomListener(labelsAtom);
const setIsLabelLayoutInit = useSetAtomValue(isLabelLayoutInit);

export class LabelPage extends Component {
    constructor(props, parentSelector) {
        super(COMPONENT_KEY.LABEL_PAGE, props, parentSelector);
        this._mountEvent = this.#initLabels.bind(this);
        this._afterMountEvent = pipe(this.#addEventToNewLabelBtn, this.#updateLabelsCount.bind(this), setIsLabelLayoutInit.bind(undefined, true));
        setLabelsListener(pipe(this.#updateChildAndLabelsCount.bind(this), this._renderChild.bind(this, [COMPONENT_KEY.LABEL_FORM], true)));
    }

    render() {
        let renderContent = getLabelTpl();
        super.render(renderContent, RENDER_TYPE.OVERRIDE);
    }

    #addEventToNewLabelBtn() {
        document.querySelector(SELECTOR.LABEL_NEW_LABEL_BUTTON)?.addEventListener('click', () => {
            document.querySelector(SELECTOR.LABEL_FORM).classList.toggle(STYLE.HIDDEN);
        });
    }

    #updateChildAndLabelsCount() {
        if (!this._isMounted) return; // mount가 안된 상태에서는 dom 접근 불가능하기 때문
        this.#updateChild();
        this.#updateLabelsCount();
    }

    #updateChild() {
        this._initChild(this.#initChild());
    }

    #updateLabelsCount() {
        document.querySelector('#labels-count').textContent = `${getLabels().length} Labels`;
    }

    async #initLabels() {
        setLabels(await fetchLabelData());
        this._initChild(this.#initChild());
    }

    #initChild() {
        // const labelForm = new LabelForm(COMPONENT_KEY.LABEL_FORM, {}, SELECTOR.LABEL_WRAPPER);
        const labelItems = getLabels().map((label) => new LabelItem(`${COMPONENT_KEY.LABEL_ITEM}-${this._index++}`, label, SELECTOR.LABEL_LIST));
        return labelItems;
    }
}