import { request } from "../../utils/api";

const CHANGE_LABEL_LIST = 'CHANGE_LABEL_LIST';
const CHANGE_LABEL_NAME = 'CHANGE_LABEL_NAME';
const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION';
const CHANGE_COLOR = 'CHANGE_COLOR';

export const labelStoreMixin = {
  labelState: {
    labelList: [],
    labelName: '',
    description: '',
    color: '',
  },
  mutations: {
    [CHANGE_LABEL_LIST]: (state, payload) => {
      state.labelList = payload;
    },
    [CHANGE_LABEL_NAME]: (state, payload) => {
      state.labelName = payload;
    },
    [CHANGE_DESCRIPTION]: (state, payload) => {
      state.description = payload;
    },
    [CHANGE_COLOR]: (state, payload) => {
      state.color = payload;
    },
  },
  fetchLabels () {
    const LABEL_API = '/data-sources/labels.json';

    request(LABEL_API)
      .then(data => {
        this.setLabelList(data);
      })
  },
  setLabelList (labelList) {
    this._commit(CHANGE_LABEL_LIST, labelList);
  },
  setLabelName (labelName) {
    this._commit(CHANGE_LABEL_NAME, labelName);
  },
  setDescription (description) {
    this._commit(CHANGE_DESCRIPTION, description);
  },
  setColor (color) {
    this._commit(CHANGE_COLOR, color);
  },
  clearInputField () {
    this.setLabelName('');
    this.setDescription('');
    this.setColor('');
  },
  _commit (actionType, payload) {
    this.mutations[actionType](this.labelState, payload);

    this.render();
  },
}