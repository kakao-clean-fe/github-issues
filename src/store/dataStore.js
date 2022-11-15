import { LabelPage } from '../pages/label';

const labelView = {
  render (target) {
    new LabelPage(target.labelData);
  }
};

const labelData = {};

const labelDataHandler = {
  get: function (target, key) {
    return key in target ? target[key] : '데이터가 비어있습니다.'
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

export const addLabelData = ({name, description, color}) => {
  const newLabelData = [...labelDataProxy.labelData, {name, description, color}];
  labelDataProxy.labelData = newLabelData;
}
