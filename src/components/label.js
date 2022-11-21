import { initLabelEvents, renderLabelList, renderLabelCount } from "../common/render";
import { store } from '../store/store';
import { postLabelsData } from '../service/apiService';

export class Label {
    isFormValid = false;

    constructor() {
        this.init();
    };

    init() {
        initLabelEvents();

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

    async addLabel () {
        const {labelNameInput, labelDescriptionInput, labelColorValue} = store.getLableFormValue();

        const body = {
            name: labelNameInput,
            color: labelColorValue.slice(1),
            description: labelDescriptionInput,
        }

        const labels = await postLabelsData(body);
        
        this.setLabels(labels);
    }
}