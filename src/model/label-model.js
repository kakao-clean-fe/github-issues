// Store
import labelStore, {
  SET_LABELS,
  SET_LABEL_COLOR,
  SET_LABEL_FORM_VALUE,
  CLEARE_FORM,
} from '../store/label-store';
import { getLabelsData, postLabelsData } from '../service/apiService';
import { initLabelEvents, renderLabelList, renderLabelCount, setCreateButtonEnable } from "../common/render";

export class LabelModel {
    isFormValid = false;

    constructor() {
        this.init();
    };

    init() {
        this.dataLoad();
        
        labelStore.subscribe(SET_LABELS, this.render);
        labelStore.subscribe(SET_LABEL_FORM_VALUE, this.checkLabelFormValidation);
        labelStore.subscribe(SET_LABEL_COLOR, this.checkLabelFormValidation);

        initLabelEvents(); // 이벤트 등록
    };

    async dataLoad () {
        const labels = await getLabelsData();

        labelStore.dispatch({type: SET_LABELS, payload: labels})
    }

    setLabels (labels) {
        labelStore.dispatch({type: SET_LABELS, payload: labels})
    }

    render() {
        renderLabelList(labelStore.getState().labels);
        renderLabelCount(`${labelStore.getState().labels.length} Labels`)
    };

    async addLabel () {
        const {labelNameInput, labelDescriptionInput, labelColorValue} = labelStore.getState().labelForm;
        const body = {
            name: labelNameInput,
            description: labelDescriptionInput,
            color: labelColorValue.slice(1),
        }
        const labels = await postLabelsData(body);
        
        this.setLabels(labels);
    }

    checkLabelFormValidation () {
        const formInputs = Object.values(labelStore.getState().labelForm);
        
        setCreateButtonEnable(!formInputs.includes(''));
    }

    clearForm () {
        labelStore.dispatch({type: CLEARE_FORM});
    }
}