import Observable from './Observable';
import { Item, Label } from '../../types';
import { API } from '../common/util';
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
  const initLabelList = () =>
    API.GET<Item[]>({
      url: './labels',
      errorMessage: '초기데이터 로딩에 실패했습니다.',
    }).then((data) => {
      observer.setData({
        labelList: data,
        createHidden: true,
      });
    });
  const getCreateHidden = () => observer.getData().createHidden;
  const getLabelList = () => observer.getData().labelList;
  const getLabelCount = () => observer.getData().labelList.length;
  const addLabel = (label: Label) => {
    const { name, description, color } = label;
    API.POST<Label[]>({
      url: './labels',
      body: { color, name, description },
    })
      .then((data) => {
        observer.setData({
          ...observer.getData(),
          labelList: data,
        });
      })
      .catch((e) => {
        debugger;
      });
  };
  const updateLabels = () => {
    API.GET<Item[]>({
      url: './labels-delay',
      errorMessage: '초기데이터 로딩에 실패했습니다.',
    }).then((data) => {
      observer.setData({
        labelList: data,
        createHidden: true,
      });
    });
  };

  setTimeout(() => {
    initLabelList();
  });
  return {
    subscribe,
    setCreateHidden,
    getCreateHidden,
    getLabelList,
    getLabelCount,
    addLabel,
    updateLabels,
  };
};
const labelObserver = LabelObservable();

export { labelObserver };
