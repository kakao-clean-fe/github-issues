import { findElement, findElementAll, getProxy } from './util';

const FunctionComponent = (...props) => {
  let _element: Element;
  let _innerHTML: () => string;
  const _eventList = [];
  let _referencesList = [];
  let _referencesId = 0;
  const beforeRenderList: (() => void)[] = [];
  const afterRenderList: (() => void)[] = [];

  const useState = <T = any>(initData: T): [T, (t: T) => void] => {
    const _data = getProxy(initData);
    const _setData = (newData: T) => {
      switch (typeof newData) {
        case 'string':
          break;
        case 'number':
          break;
        case 'boolean':
          break;

        default:
          Object.entries(newData).forEach(([keys, values]) => {
            if (_data.hasOwnProperty(keys) && _data[keys] !== values) {
              _data[keys] = values;
            }
          });
          break;
      }
      render();
    };
    return [_data, _setData];
  };
  const useEffect = (callback: () => void, references?: any[][]) => {
    callback();
    render();
  };
  const render = () => {
    beforeRenderList.forEach((event) => event());
    _element.innerHTML = _innerHTML();
    _eventList.forEach((event) => {
      event();
    });
    afterRenderList.forEach((event) => event());
  };
  const addEventListener = (
    querySelector: string,
    event: string,
    callback: (e: Event) => void
  ) => {
    _eventList.push(() => {
      findElement(_element)(querySelector).addEventListener(event, callback);
    });
  };
  const setComponent = (
    innerHTML: (props?: any) => string,
    element: Element
  ) => {
    _element = element;
    _innerHTML = innerHTML;
    render();
  };

  const addBeforeRender = (event: () => void) => {
    beforeRenderList.push(event);
  };
  const addAfterRender = (event: () => void) => {
    afterRenderList.push(event);
  };
  const getRoot = () => _element;
  const getElement = (querySelector: string) =>
    findElement(getRoot())(querySelector);
  const getElementAll = (querySelector: string) =>
    findElementAll(getRoot())(querySelector);

  return {
    useState,
    useEffect,
    setComponent,
    addEventListener,
    render,
    addBeforeRender,
    addAfterRender,
    getRoot,
    getElement,
    getElementAll,
  };
};

export default FunctionComponent;
