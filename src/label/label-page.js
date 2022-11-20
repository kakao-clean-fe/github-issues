import { LabelCreateView } from "./label-create-view.js";
import { LabelListView } from "./label-list-view.js";
import { LabelStore } from "./label-store.js";

export function initLabelPage() {
  const labelStore = new LabelStore();
  const labelListView = new LabelListView();
  const labelCreateView = new LabelCreateView();

  labelCreateView.refreshColorBtnClick$.subscribe(() => {
    labelStore.generateRandomColor();
  });
  labelCreateView.labelFormSubmit$.subscribe(() => {
    labelStore.createLabel();
  });
  labelCreateView.labelFormChange$.subscribe((value) => {
    labelStore.setLabelForm(value);
  });
  labelListView.updateLabelsButtonClick$.subscribe(() => {
    labelStore.getLabels();
  });

  Object.defineProperty(labelStore, "labelList", {
    set(labels) {
      labelListView.render(labels);
      this._labelList = labels;
    },
  });
  Object.defineProperty(labelStore, "form", {
    set(form) {
      labelCreateView.renderColor(form.color);
      labelCreateView.renderLabelPreview(form);
      labelCreateView.checkCreateButtonActive(form);
      this._form = form;
    },
    get() {
      return this._form;
    },
  });
}
