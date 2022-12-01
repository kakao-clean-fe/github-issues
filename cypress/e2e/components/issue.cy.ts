/// <reference types="cypress" />
import { eventListener, isEquals } from '../../../src/common/util';
import Issue from '../../../src/components/issue/Issue';

describe('issue page test', () => {
  context('rendering issue', () => {
    beforeEach(() => {
      cy.visit('http://dsp.kakao.com:5173/');
    });
    it('issue rendering', () => {
      cy.location('href').should('contain.text', '5173');
    });
  });
});
