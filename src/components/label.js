import { renderLabelList, renderLabelCount, setLabelFormToggleEvent, setRandomColorChangeEvent, renderLabelTpl } from "../common/render";
import { store } from '../store/store';
import Observable from '../observable';

export class Label extends Observable {

    constructor(labels){
        super();

        store.setLables(labels);
    }

    init() {
        renderLabelTpl();
        setLabelFormToggleEvent();
        setRandomColorChangeEvent();

        this.render();
    }

    setLables(labels) {
        store.setLables(labels);

        this.render();
    }

    getLables() {
        return store.getLabels();
    }

    render() {
        renderLabelList(store.getLabels());
        renderLabelCount(`${store.getLabels().length} Labels`)
    }
}