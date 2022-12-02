/// <reference types="cypress" />
import { eventListener, isEquals } from '../../../src/common/util';
import Issue from '../../../src/components/issue/Issue';

describe('issue page test', () => {
  context('rendering issue', () => {
    beforeEach(() => {
      cy.visit('http://dsp.kakao.com:5173/');
      cy.get('nav button:nth-child(1)').click();
    });
    it('issue rendering', () => {
      cy.get('#issue-wrapper').should('exist');
    });
    it('init data test', () => {
      cy.get('.issue-list li')
        .its('length') // calls 'length' property returning that value
        .should('eq', 4); // ensure the length is greater than 2('have.keys', 4);
    });

    it('open filter click test', () => {
      // given
      const filter = 'open-count';
      // when
      cy.get(`.${filter}`).click();
      // then
      cy.get(`.${filter}`).should('have.class', 'font-bold');

      // when
      cy.get(`.${filter}`).click();
      // then
      cy.get(`.${filter}`).should('not.have.class', 'font-bold');
    });

    it('close filter click test', () => {
      // given
      const filter = 'close-count';
      // when
      cy.get(`.${filter}`).click();
      // then
      cy.get(`.${filter}`).should('have.class', 'font-bold');

      // when
      cy.get(`.${filter}`).click();
      // then
      cy.get(`.${filter}`).should('not.have.class', 'font-bold');
    });

    it('open filtering test', () => {
      // given
      const filter = 'open-count';
      const openedData = 3;

      // when
      cy.get(`.${filter}`).click();

      cy.get('.issue-list li')
        .its('length') // calls 'length' property returning that value
        .should('eq', openedData); // ensure the length is greater than 2('have.keys', 4);
    });

    it('close filtering test', () => {
      // given
      const filter = 'close-count';
      const openedData = 1;

      // when
      cy.get(`.${filter}`).click();

      cy.get('.issue-list li')
        .its('length') // calls 'length' property returning that value
        .should('eq', openedData); // ensure the length is greater than 2('have.keys', 4);
    });
  });
});
