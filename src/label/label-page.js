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
  labelCreateView.labelFormSubmit$.subscribe((value) => {
    labelStore.createLabel(value);
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
  Object.defineProperty(labelStore, "color", {
    set(color) {
      labelCreateView.renderColor(color);
      this._color = color;
    },
  });
}
