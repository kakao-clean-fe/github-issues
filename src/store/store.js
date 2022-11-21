import { setCreateButtonEnable } from '../common/render';
import { labelObj } from '../init';
import { postLabelsData } from '../service/apiService';

const state = {
  _labels: [],
  _issues: [],
  _labelForm: {
    labelNameInput: '',
    labelDescriptionInput: '',
    labelColorValue: ''
  }
};

export const store = {
    // actions
    getLabels () {
        return state._labels;
    },

    setLabels (labels) {
        state._labels = labels;
    },

    getIssues () {
        return state._issues;
    },

    setIssues (issues) {
        state._issues = issues;
    },

    setLabelFormValue (targetId, value) {
        state._labelForm[targetId] = value;
        this.checkLabelFormValid();
    },

    checkLabelFormValid () {
        const formInputs = Object.values(state._labelForm);

        setCreateButtonEnable(!formInputs.includes(''))
    },

    clearForm () {
        const keys = Object.keys(state._labelForm);

        keys.forEach((key) => state._labelForm[key] = '');
    },

    getLableFormValue () {
        return state._labelForm;
    },
}
