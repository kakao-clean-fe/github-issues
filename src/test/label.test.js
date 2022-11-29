import {jest} from '@jest/globals';
import { Window } from 'happy-dom';
import { Component } from '../components';
import { initBodyStr, labelFormStr, labelHeaderStr, labelListBodyStr, labelListHeaderStr, labelListStr, labelPageStr, newLabelButtonStr, updateLabelButtonStr } from '../constants/template-label';
import '@testing-library/jest-dom';
import { querySelector } from '../utils/dom-selector';
import { labelMockData } from '../mocks/data';
import { LabelStore } from '../stores/label';
import { LabelListBody, LabelListHeader } from '../components/Label/LabelList';

describe('📄 [Label Page] :', () => {
  const window = new Window();
  const document = window.document;
  let labelStore;

  beforeAll(() => {
    labelStore = new LabelStore(labelMockData, window.localStorage);
  });
  describe('Component 생성 테스트 :', () => {
    beforeAll(() => {
      document.body.innerHTML = initBodyStr;
    });
    
    const createElementTest = (templateStr, selector, ClassName = Component, position = null) => {
      const component = new ClassName(templateStr, selector, position, document);
      expect(component.template).toBeInTheDocument();
    }

    test('라벨 페이지 영역("#label-wrapper") div가 정상적으로 생성된다.', () => createElementTest(labelPageStr, '#app'));
    test('라벨 헤더("#header") div가 정상적으로 생성된다.', () => createElementTest(labelHeaderStr, '#label-wrapper'));
    test('라벨 리스트 영역("#labels-wrapper") div가 정상적으로 생성된다.', () => createElementTest(labelListStr, '#label-wrapper'));
    test('라벨 업데이트 버튼이 정상적으로 생성된다.', () => createElementTest(updateLabelButtonStr, '#label-wrapper'));
  
    test('라벨 폼이 정상적으로 생성된다.', () => createElementTest(labelFormStr, '#header', Component, { position:'after' }));
    test('새로운 라벨 추가 버튼이 정상적으로 생성된다.', () => createElementTest(newLabelButtonStr, '#header'));

    test('라벨 리스트의 헤더가 정상적으로 생성된다.', () => {
      const component = new LabelListHeader(labelListHeaderStr, '#labels-wrapper', labelStore.labelList.length, document);
      expect(component.template).toBeInTheDocument();
      
    });
    test('라벨 리스트의 바디가 정상적으로 생성된다.', () => {
      const component = new LabelListBody(labelListBodyStr, '#labels-wrapper', labelStore.labelList, document);
      expect(component.template).toBeInTheDocument();
    });
  })
});
