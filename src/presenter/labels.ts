import {Label} from "../types";
import LabelView from "../view/label";
import labelModel, { LabelModelType } from "../models/labels";
import {Observer} from "../observer";

export type LabelPresenterType = Omit<LabelPresenter, 'notifyLoaded'>;

export default class LabelPresenter implements Observer {
    private view: LabelView;
    private model: LabelModelType;

    public constructor(view: LabelView) {
        this.view = view;
        this.model = labelModel;
        this.model.register(this);
        this.loadLabelList = this.loadLabelList.bind(this);
        this.getLabelList = this.getLabelList.bind(this);
    }

    public loadLabelList() {
        this.model.loadLabel();
    }

    public getLabelList() {
        const issues: Array<Label> = this.model.getResource;
        return issues;
    }

    public appendLabelList(label: Label) {
        this.model.setResource = [...this.model.getResource, label];
    }

    public notify(labels: Array<Label>) {
        this.view.updateLabels(labels);
    }

}
