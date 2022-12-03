import { Window } from 'happy-dom';
import { initBodyStr, labelCreateActionDivStr, labelCreateCancelButtonStr, labelCreateSubmitButtonStr, labelFormStr, labelHeaderStr, labelInputDivStr, labelListBodyStr, labelListHeaderStr, labelListStr, labelPageStr, newLabelButtonStr, updateLabelButtonStr } from '../constants/template-label';
import '@testing-library/jest-dom';
import { labelMockData } from '../mocks/data';
import { LabelStore } from '../stores/label';
import LabelList, { LabelListBody, LabelListHeader } from '../components/Label/LabelList';
import UpdateLabelButton from '../components/Label/UpdateLabelButton';
import LabelForm, { CancelButton, LabelCreateActionDiv, LabelInputDiv, SubmitButton } from '../components/Label/LabelForm';
import Header, { NewLabelButton } from '../components/Label/Header';
import LabelPage from '../pages/label';

describe('📄 [Label Page] :', () => {
  const window = new Window();
  const document = window.document;
  let labelStore;

  beforeAll(() => {
    labelStore = new LabelStore(labelMockData, window.localStorage);
  });
  describe('Component 생성 테스트 :', () => {
    let component;
    beforeAll(() => {
      document.body.innerHTML = initBodyStr;
    });
    afterEach(()=>{
      expect(component.template).toBeInTheDocument();
    })
    test('라벨 페이지 영역("#label-wrapper") div가 정상적으로 생성된다.', () => {
      component = new LabelPage(labelPageStr, '#app', labelStore.labelList, document, window.localStorage);
    });

    test('라벨 헤더("#header") div가 정상적으로 생성된다.',  () => {
      component = new Header(labelHeaderStr, '#label-wrapper', labelStore, document);
    });

    test('라벨 리스트 영역("#labels-wrapper") div가 정상적으로 생성된다.', () => {
      component = new LabelList(labelListStr, '#label-wrapper', labelStore, document);
    });

    test('라벨 업데이트 버튼이 정상적으로 생성된다.', () => {
      component = new UpdateLabelButton(updateLabelButtonStr, '#label-wrapper', labelStore, document);
    });
  
    test('라벨 폼이 정상적으로 생성된다.', () => {
      component = new LabelForm(labelFormStr, '#header', labelStore, { position:'after' }, document);
    });

    test('새로운 라벨 추가 버튼이 정상적으로 생성된다.', () => {
      component = new NewLabelButton(newLabelButtonStr, '#header', labelStore, document);
    });

    test('라벨 리스트의 헤더가 정상적으로 생성된다.', () => {
      component = new LabelListHeader(labelListHeaderStr, '#labels-wrapper', labelStore.labelList.length, document);
    });

    test('라벨 리스트의 바디가 정상적으로 생성된다.', () => {
      component = new LabelListBody(labelListBodyStr, '#labels-wrapper', labelStore.labelList, document);
    });

    test('라벨 Input 영역 div가 정상적으로 생성된다.', () => {
      component = new LabelInputDiv(labelInputDivStr, '#new-label-form', labelStore, document);
    });

    test('라벨 생성/취소 Button의 영역 div가 정상적으로 생성된다.', () => {
      component = new LabelCreateActionDiv(labelCreateActionDivStr, '#label-input-wrapper', labelStore, document);
    });

    test('라벨 생성 Cancel 버튼이 정상적으로 생성된다.', () => {
      component = new CancelButton(labelCreateCancelButtonStr, '#form-button-group', labelStore, document);
    });

    test('라벨 생성 Submit 버튼이 정상적으로 생성된다.', () => {
      component = new SubmitButton(labelCreateSubmitButtonStr, '#form-button-group', labelStore, document);
    });
  })
});
