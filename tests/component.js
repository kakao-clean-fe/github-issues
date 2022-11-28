import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { LabelCreator } from '../src/views/LabelCreator';
import { Window } from 'happy-dom';

describe('component', () => {
  describe('label', () => {
    describe('views/labelCreator', () => {
      let labelCreatorView;

      beforeEach(() => {

      });

      afterEach(() => {
        labelCreatorView = null;
      });

      const window = new Window();
      const document = window.document;

      describe('constructor' , () => {
        it('parentElement', () => {
          const element = document.createElement('div');
          element.classList.add('_label_creator_wrapper');
          labelCreatorView = new LabelCreator(element);



          expect(labelCreatorView.parentElement).toBe(`<div class="_label_creator_wrapper"></div>`);
        });
      });
    });
  });
});