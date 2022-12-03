/// <reference types="cypress" />

describe('label page test', () => {
  context('rendering issue', () => {
    beforeEach(() => {
      cy.visit('http://dsp.kakao.com:5173/');
      cy.get('nav button:nth-child(2)').click();
    });
    it('label rendering', () => {
      cy.get('#label-wrapper').should('exist');
    });
    it('init data test', () => {
      cy.get('.label-item')
        .its('length') // calls 'length' property returning that value
        .should('eq', 6); // ensure the length is greater than 2('have.keys', 4);
    });
    it('new label button open test', () => {
      // when
      cy.get('.new-label-button').click();
      // then
      cy.get('#new-label-form').should('exist');
    });

    it('new label close test', () => {
      // given
      cy.get('.new-label-button').click();
      // wheb
      cy.get('#label-input-wrapper > div > button:nth-child(1)').click();
      // then
      cy.should('not.exist', '#new-label-form');
    });

    it('add new label test', () => {
      // given
      const name = 'sun.kist';
      const description = 'kakao corp';
      cy.get('.new-label-button').click();

      // when
      cy.get('#label-name-input').type(name);
      cy.get('#label-description-input').type(description);
      cy.get('#new-label-color').click();
      cy.wait(5);
      cy.get('#label-create-button').click();

      // then
      cy.get('.label-item')
        .its('length') // calls 'length' property returning that value
        .should('be.gt', 6); // ensure the length is greater than 2('have.keys', 4);
    });
  });
});
