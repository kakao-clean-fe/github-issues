import * as tpl from './tpl';

// msw worker.
import { worker } from './mocks/browser';
worker.start();

import { NewLabelStore, NewLabelObserver } from './store/newLabelStore';
import { CreateLabelStore, CreateLabelObserver } from './store/createLabelStore';
import { LabelListStore, LabelListObserver } from './store/labelListStore';
import { $ } from './utils/utils';

// Making variables and functions private.
(() => {
  async function initializeLabelPage() {
    $('#app').innerHTML = tpl.getLabelTpl();
  
    new NewLabelObserver(new NewLabelStore());
    new CreateLabelObserver(new CreateLabelStore());
    new LabelListObserver(new LabelListStore());
  }
  $('#label').addEventListener('click', () => initializeLabelPage());
})();
