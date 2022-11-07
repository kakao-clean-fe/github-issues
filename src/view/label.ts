import {$} from '../utils';
import {Label} from "../types";
import {getLabelItemTpl, getLabelTpl} from "../tpl";
import LabelPresenter, {LabelPresenterType} from "../presenter/labels";

export default class LabelView {
    private presenter: LabelPresenterType;
    private readonly $app: HTMLDivElement | null;
    private $openCount: HTMLDivElement | null = null;
    private $list: HTMLUListElement | null = null;

    public constructor() {
        this.$app = $('#app');
        this.presenter = new LabelPresenter(this);
    }

    public attach () {
        if (!this.$app) return;
        this.$app.innerHTML = getLabelTpl();
        this.$openCount = $('.label-header > .open-count');
        this.$list = $('.label-list', this.$app);
        this.presenter.loadLabelList();
    }

    public updateLabels (labels: Array<Label>) {
        this.updateList(labels);
        this.updateLabelCounts(labels);
    }

    private updateList (labels: Array<Label>) {
        if (!this.$list) return;
        this.$list.innerHTML = labels?.reduce((acc, label) => `${acc}${getLabelItemTpl(label)}`, '') ?? '';
    }

    private updateLabelCounts (labels: Array<Label>) {
        if (!this.$openCount) return;
        this.$openCount.innerHTML = `${labels} Labels`;
    }
}