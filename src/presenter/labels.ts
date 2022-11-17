import Model from '../models/labels';
import {Label} from "../types";
import LabelView from "../view/label";

export type LabelPresenterType = Omit<LabelPresenter, 'notifyLoaded'>;
export type LabelContactType = Pick<LabelPresenter, 'notify'>;

export default class LabelPresenter {
    private view: LabelView;
    private model;

    public constructor(view: LabelView) {
        this.view = view;
        this.model = Model(this);
        this.loadLabelList = this.loadLabelList.bind(this);
        this.getLabelList = this.getLabelList.bind(this);
    }

    public loadLabelList() {
        this.model.loadLabel();
    }

    public getLabelList() {
        const issues: Array<Label> = this.model.getResource();
        return issues;
    }

    public appendLabelList(label: Label) {
        this.model.setResource([...this.model.getResource(), label]);
    }

    public notify(labels: Array<Label>) {
        this.view.updateLabels(labels);
    }

}
