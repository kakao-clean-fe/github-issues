import { findElement, findElementAll } from './util';

const FunctionComponent = (() => {
  let _element: Element;
  let _innerHTML: () => string;
  const _eventList = [];
  let _referencesList = [];
  let _referencesId = 0;
  const beforeRenderList: (() => void)[] = [];
  const afterRenderList: (() => void)[] = [];

  const useState = <T = any>(initData: T): [() => T, (t: T) => void] => {
    let _data = initData;
    const _setData = (newData: T) => {
      _data = newData;
      render();
    };
    return [() => _data, _setData];
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
})();

export default FunctionComponent;
