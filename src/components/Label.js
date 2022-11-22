import MyReact from '../core/MyReact.js';
import {getLabelTpl} from '../tpl.js';
import {labelStore} from '../stores/labelStore.js';
import {asyncPipe} from '../utils/pipe.js';
import {getLabelItemList} from '../api/label/index.js';
import LabelItem from './LabelItem.js';
import {getRandomColorCode} from '../utils/color.js';


const SELECTOR = {
  labelColorValue: '#label-color-value',
  labelCount: '.open-count',
  labelCreateButton: '#label-create-button',
  labelDescriptionValue: '#label-description-input',
  labelList: '.label-list',
  labelNameValue: '#label-name-input',
  labelPreview: '#label-preview',
  newLabel: '.new-label-button > a',
  newLabelColor: '#new-label-color',
  newLabelForm: '#new-label-form',
}

class Label {
  constructor() {
    this.store = labelStore();
    this.fetchLabelItemList();
  }

  template = () => getLabelTpl();

  getClassNameSetter = (selector, className) => state => {
    if (state) {
      document.querySelector(selector).classList.remove(className);
    } else {
      document.querySelector(selector).classList.add(className);
    }
  };

  setNewLabelHiddenClass = this.getClassNameSetter(SELECTOR.newLabelForm, 'hidden');

  setCreateLabelOpacityClass = this.getClassNameSetter(SELECTOR.labelCreateButton, 'opacity-50');

  setLabelItemList = labelItems => {
    this.store.dispatch({
      values: {...this.store.getState().values, labelItems},
    });
  };

  setLabelInputValue = (labelKey, value) => {
    document.querySelector(SELECTOR[labelKey]).value = value;
  };

  setLabelBackgroundColor = colorCode => {
    document.querySelector(SELECTOR.newLabelColor).style.backgroundColor = colorCode;
    document.querySelector(SELECTOR.labelPreview).style.backgroundColor = colorCode;
  };

  setCreateLabelButtonDisabled = () => {
    const {
      labelNameValue,
      labelDescriptionValue,
      labelColorValue,
    } = this.store.getState().values;
    const disabled = (
      labelNameValue === ''
      || labelDescriptionValue === ''
      || labelColorValue === ''
    );
    document.querySelector(SELECTOR.labelCreateButton).disabled = disabled;
    this.setCreateLabelOpacityClass(!disabled);
  };

  fetchLabelItemList = asyncPipe(getLabelItemList, this.setLabelItemList);

  renderNewLabelForm = () => {
    const {
      newLabelIsOpen,
      labelNameValue,
      labelDescriptionValue,
      labelColorValue,
    } = this.store.getState().values;

    this.setNewLabelHiddenClass(newLabelIsOpen);
    const setLabelInputValueParams = {
      'labelNameValue': labelNameValue,
      'labelDescriptionValue': labelDescriptionValue,
      'labelColorValue': labelColorValue,
    };
    Object.entries(setLabelInputValueParams).map(
      ([key, value]) => this.setLabelInputValue(key, value)
    );
    this.setLabelBackgroundColor(labelColorValue);
    this.setCreateLabelButtonDisabled();
  };

  renderLabelItems = () => {
    this.store.getState().values.labelItems.map(labelItem => {
      document.querySelector(SELECTOR.labelList).innerHTML += LabelItem({labelItem}).template();
    });
  };

  renderLabelCounts = () => {
    document.querySelector(SELECTOR.labelCount).textContent = `${this.store.getState().values.labelItems.length} Labels`;
  };

  handleChangeLabelInputValue = (labelKey, value) => {
    this.setLabelInputValue(labelKey, value);
    this.store.dispatch({
      values: {...this.store.getState().values, ...{[labelKey]: value}},
    });
  };

  handleClickNewLabelColorButton = () => {
    this.handleChangeLabelInputValue('labelColorValue', getRandomColorCode());
  };

  handleClickNewLabelButton = () => {
    const {newLabelIsOpen} = this.store.getState().values;
    this.store.dispatch({
      values: {...this.store.getState().values, newLabelIsOpen: !newLabelIsOpen},
    });
  };

  handleSubmitNewLabelForm = event => {
    event.preventDefault();
    const {values} = this.store.getState();
    const {
      labelItems,
      labelNameValue: name,
      labelColorValue: color,
      labelDescriptionValue: description,
    } = values;
    this.store.dispatch({
      values: {
        ...values,
        labelItems: [...labelItems, {
          name,
          description,
          color: color.replace('#', ''),
        }],
      },
    });
  };

  templateDidMount = async () => {
    this.renderLabelItems();
    this.renderLabelCounts();
    this.renderNewLabelForm();
  };

  setEvent = () => {
    document.querySelector(SELECTOR.newLabel).addEventListener('click', () => {
      this.handleClickNewLabelButton();
    });
    document.querySelector(SELECTOR.newLabelColor).addEventListener('click', () => {
      this.handleClickNewLabelColorButton();
    });

    document.querySelector(SELECTOR.newLabelForm).addEventListener('submit', e => {
      this.handleSubmitNewLabelForm(e);
    });

    document.querySelector(SELECTOR.labelNameValue).addEventListener('change', ({target: {value}}) => {
      this.handleChangeLabelInputValue('labelNameValue', value);
    });
    document.querySelector(SELECTOR.labelDescriptionValue).addEventListener('change', ({target: {value}}) => {
      this.handleChangeLabelInputValue('labelDescriptionValue', value);
    });
    document.querySelector(SELECTOR.labelColorValue).addEventListener('change', ({target: {value}}) => {
      this.handleChangeLabelInputValue('labelColorValue', value);
    });
  };
}

export default () => MyReact.createComponent({...new Label()});
