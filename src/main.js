import * as tpl from './tpl';
import { NewLabelStore, NewLabelObserver } from './store/newLabelStore';
import { CreateLabelStore, CreateLabelObserver } from './store/createLabelStore';
import { LabelListStore, LabelListObserver } from './store/labelListStore';

document.getElementById('label').addEventListener('click', e => initializeLabelPage());

async function initializeLabelPage() {
  document.getElementById('app').innerHTML = tpl.getLabelTpl();

  new NewLabelObserver(new NewLabelStore());
  new CreateLabelObserver(new CreateLabelStore());
  new LabelListObserver(new LabelListStore());
}