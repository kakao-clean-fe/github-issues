import { renderLabelList, renderLabelCount, setLabelFormToggleEvent, setRandomColorChangeEvent, renderLabelTpl } from "../common/render";
import { store } from '../store/store';

export class Label {

    constructor(labels){
        store.setLabels(labels);
    };

    init() {
        renderLabelTpl();
        setLabelFormToggleEvent();
        setRandomColorChangeEvent();

        this.render();
    };

    setLabels(labels) {
        store.setLabels(labels);

        this.render();
    };

    getLabels() {
        return store.getLabels();
    };

    render() {
        renderLabelList(store.getLabels());
        renderLabelCount(`${store.getLabels().length} Labels`)
    };
}