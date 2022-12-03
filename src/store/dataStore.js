import { LabelPage } from '../pages/label';
import { selectElement } from '../utils/dom';
import { SELECTOR } from '../constants/selector';

const labelView = {
  render (target) {
    const app = selectElement(SELECTOR.APP);
    const labelPage = new LabelPage(target.labelData, app);
    labelPage.render();
  }
};

const labelData = {};

const labelDataHandler = {
  get: function (target, key) {
    return key in target ? target[key] : console.log('데이터가 비어있습니다.');
  },
  set: function (target, key, value) {
    if (target[key] !== value) {
      target[key] = value;
      labelView.render(target);
      return true;
    } else {
      return false;
    }
  }
}

export const labelDataProxy = new Proxy(labelData, labelDataHandler);

export const setLabelData = (newLabelData) => {
  labelDataProxy.labelData = newLabelData;
}
