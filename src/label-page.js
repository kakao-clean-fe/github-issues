import {getLabelItemTpl, getLabelTpl} from "./tpl.js";
import {Observable} from "./helpers/observable.js";
import {fetchLabels} from "./api/fetch.js";
import {htmlToElement} from "./issue-renderer.js";
import {pipe} from "./helpers/fp-helpers.js";

class LabelStore {
  labelList = [];
  color = '';
  constructor() {
    fetchLabels().then((labels) => {
      this.labelList = labels;
    });
  }
  createLabel() {
    console.log('createLabel');
  }
  generateRandomColor() {
    console.log('generateRandomColor');
  }
}

class LabelCreateView {
  clickCreateBtn$ = new Observable();
  clickColorGenButton$ = new Observable();
  isShowCreateView = false;
  constructor() {
    document.getElementById('new-label-button').addEventListener('click', this.toggleCreateView)
  }
  renderColor() {
    console.log('renderColor');
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
}

class LabelListView {
  constructor() {
    document.getElementById('app').innerHTML = getLabelTpl();
  }
  render(labels) {
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

  labelCreateView.clickCreateBtn$.subscribe(() => {
    labelStore.createLabel();
  });

  labelCreateView.clickColorGenButton$.subscribe(() => {
    labelStore.generateRandomColor();
  })

  Object.defineProperty(labelStore, 'labelList', {
    get() {
    },
    set(labels) {
      labelListView.render(labels);
    }
  });

  Object.defineProperty(labelStore, 'color', {
    get() {
    },
    set() {
      labelCreateView.renderColor(this.color);
    }
  })
}

