import {getLabelItemTpl, getLabelTpl} from "./tpl.js";
import {Observable} from "./helpers/observable.js";
import {fetchLabels} from "./api/fetch.js";
import {htmlToElement} from "./issue-renderer.js";
import {pipe} from "./helpers/fp-helpers.js";

class LabelStore {
  _labelList = [];
  constructor() {
    fetchLabels().then((labels) => {
      this.labelList = labels;
      console.log(labels)
    });
  }
  createLabel(label) {
    console.log(this.labelList)
    this.labelList = this._labelList.concat([label]);
    console.log('createLabel', label);
  }
}

class LabelCreateView {
  clickCreateBtn$ = new Observable();
  clickColorGenButton$ = new Observable();
  isShowCreateView = false;
  // 얘네도 다 모델로 빼야 할까..?
  labelNameValue = '';
  descriptionValue = '';
  color = '';
  // form = {
  //   labelNameValue: '',
  //   descriptionValue: '',
  //   color: '',
  // };

  constructor() {
    document.getElementById('new-label-button').addEventListener('click', this.toggleCreateView.bind(this));
    document.getElementById('new-label-color').addEventListener('click', this.refreshColor.bind(this));
    document.getElementById('label-create-button').addEventListener('click', this.onClickCreateButton.bind(this))

    const labelNameInputElement = document.getElementById('label-name-input');
    labelNameInputElement.addEventListener('input', () => {
      this.labelNameValue = labelNameInputElement.value;
      this.renderLabelPreview();
      this.activeCreateButton();
    });
    const labelDescriptionInputElement = document.getElementById('label-description-input');
    labelDescriptionInputElement.addEventListener('input', () => {
      this.descriptionValue = labelDescriptionInputElement.value;
      this.activeCreateButton();
    });
  }

  refreshColor() {
    this.generateRandomColor();
    this.renderColor();
    this.renderLabelPreview();

    this.activeCreateButton();
  }

  generateRandomColor() {
    const randomRGBValue = () => Math.floor(Math.random() * 256 * 256 * 256);
    this.color = randomRGBValue().toString(16);
  }
  renderColor() {
    document.getElementById('new-label-color').style.backgroundColor = '#' + this.color;
    document.getElementById('label-color-value').value = this.color;
  }
  renderLabelPreview() {
    const labelPreviewElement = document.getElementById('label-preview');
    labelPreviewElement.style.backgroundColor = '#' + this.color;
    labelPreviewElement.innerText = this.labelNameValue ? this.labelNameValue : 'Label Preview';
  }
  toggleCreateView() {
    if (!this.isShowCreateView) {
      document.getElementById('new-label-form').classList.remove('hidden');
      this.isShowCreateView = true;
    } else {
      document.getElementById('new-label-form').classList.add('hidden');
      this.isShowCreateView = false;
    }
  }
  onClickCreateButton(e) {
    e.preventDefault()

    if (this.labelNameValue && this.descriptionValue && this.color) {
      this.clickCreateBtn$.next({
        name: this.labelNameValue,
        description: this.descriptionValue,
        color: this.color,
      })
    }
  }
  activeCreateButton() {
    if (this.labelNameValue && this.descriptionValue && this.color) {
      document.getElementById('label-create-button').disabled = false;
    } else {
      document.getElementById('label-create-button').disabled = true;
    }

  }
}

class LabelListView {
  constructor() {
    document.getElementById('app').innerHTML = getLabelTpl();
  }
  render(labels) {
    console.log('render', labels);
    const labelsListElement = document.querySelector('ul.label-list');
    labelsListElement.innerHTML = '';
    labels.forEach(this._renderLabel);
  }
  _renderLabel(label) {
    const labelsListElement = document.querySelector('ul.label-list');
    return pipe(
      getLabelItemTpl,
      htmlToElement,
      ele => labelsListElement.appendChild(ele),
    )(label);
  }
}

export function initLabelPage() {
  const labelStore = new LabelStore();
  const labelListView = new LabelListView();
  const labelCreateView = new LabelCreateView();

  labelCreateView.clickCreateBtn$.subscribe((label) => {
    labelStore.createLabel(label);
  });

  labelCreateView.clickColorGenButton$.subscribe(() => {
    // labelStore.generateRandomColor();
  })

  Object.defineProperty(labelStore, 'labelList', {
    get() {
    },
    set(labels) {
      labelListView.render(labels);
      this._labelList = labels;
    }
  });
}

