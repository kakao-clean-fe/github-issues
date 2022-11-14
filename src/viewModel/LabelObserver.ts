import { LabelBuilder } from './../store/LabelStoreClass';
import Observable from './Observable';
import { Item, Label, Status } from '../../types';
import { STATUS } from '../common/constants';
import { API, pipe } from '../common/util';
import { labelStore } from '../store/LabelStoreClass';

const LabelObservable = () => {
  const observer = Observable(labelStore);
  const subscribe = observer.subscribe;

  const setCreateHidden = (hidden: boolean) => {
    observer.setData({
      ...observer.getData(),
      createHidden: hidden,
    });
  };
  const getCreateHidden = () => observer.getData().createHidden;
  const getLabelList = () => observer.getData().labelList;
  const getLabelCount = () => observer.getData().labelList.length;
  const addLabel = (label: Label) =>
    observer.setData({
      ...observer.getData(),
      labelList: [...getLabelList(), label],
    });
  API.GET<Item[]>({
    url: './data-sources/labels.json',
    errorMessage: '초기데이터 로딩에 실패했습니다.',
  }).then((data) => {
    observer.setData({
      labelList: data,
      createHidden: true,
    });
  });
  return {
    subscribe,
    setCreateHidden,
    getCreateHidden,
    getLabelList,
    getLabelCount,
    addLabel,
  };
};
const labelObserver = LabelObservable();

export { labelObserver };
